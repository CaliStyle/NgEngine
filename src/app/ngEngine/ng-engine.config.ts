// import * as ES6Map from 'es6-map'
import 'core-js/es6/map'
import { IllegalAccessError } from './ng-engine.errors'
import { NgEngineCore } from './ng-engine.core'
import { merge, isArray, defaults, union } from 'lodash'

// declare var ES6Map: ES6MapConstructor
// interface ES6Map<K, V> {
//   size: number;
//   [Symbol.toStringTag]: string;
//   [Symbol.iterator](): IterableIterator<[K, V]>;
//   clear(): void;
//   delete(key: K): boolean;
//   entries(): IterableIterator<[K, V]>;
//   forEach(callbackfn: (value: V, index: K, map: ES6Map<K, V>) => void, thisArg?: any): void;
//   get(key: K): V;
//   has(key: K): boolean;
//   keys(): IterableIterator<K>;
//   set(key: K, value?: V): ES6Map<K, V>;
//   values(): IterableIterator<V>;
// }
//
// interface ES6MapConstructor {
//   new <K, V>(): ES6Map<K, V>;
//   new <K, V>(iterable: Iterable<[K, V]>): ES6Map<K, V>;
//   prototype: ES6Map<any, any>;
// }


// Proxy Handler for get requests to the configuration
const ConfigurationProxyHandler: ProxyHandler<NgEngineConfig> = {
  get (target: any, key: string) {
    if (target.has && target.has(key)) {
      const value = target.immutable === true ? Object.freeze(target.get(key)) : target.get(key)
      return new Proxy(value, ConfigurationProxyHandler)
    }
    else {
      return target.immutable === true ? Object.freeze(target[key]) : target[key]
    }
  }
}

/**
 * Extend map class for getter/setter tuple config
 */
export class NgEngineConfig {
  public immutable: boolean
  public env: {}
  public map: Map<any, any>
  // public get: any
  // public entries: any
  // public has: any

  constructor (
    configTree: {[key: string]: any} = { },
    processEnv: {
      [key: string]: any,
      APP_ENV?: string
    } = { }
  ) {
    // Constants for configuration
    // const config = NgEngineConfig.buildConfig(configTree, processEnv['APP_ENV'] || 'development')
    const config = NgEngineCore.buildConfig(configTree, processEnv['APP_ENV'] || 'development')
    // const configEntries = Object.entries(NgEngineConfig.flattenTree(config))
    const configEntries = Object.entries(NgEngineCore.flattenTree(config))
    // Add to the map constructor
    // super(configEntries)
    this.map = new Map(configEntries)

    // Initial values
    this.immutable = false
    this.env = processEnv

    // Bind methods
    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.entries = this.entries.bind(this)
    this.has = this.has.bind(this)
    this.keys = this.keys.bind(this)
    this.values = this.values.bind(this)
    this.dehydrate = this.dehydrate.bind(this)

    // return this
    // Return Proxy
    return new Proxy(this, ConfigurationProxyHandler)
  }

  public get(key) {
    return this.map.get(key)
  }
  public entries() {
    return this.map.entries()
  }
  public has(key) {
    return this.map.has(key)
  }
  public values() {
    return this.map.values()
  }
  public keys() {
    return this.map.keys()
  }
  public dehydrate() {
    const obj = {}
    this.map.forEach ((v, k) => { obj[k] = v })
    return obj
  }

  /**
   * Recursively sets the tree values on the config map
   */
  private _reverseFlattenSet(key, value) {
    if (/\.[0-9a-z]+$/.test(key)) {
      const decedent = (key).match(/\.([0-9a-z]+)$/)[1]
      const parent = key.replace(/\.[0-9a-z]+$/, '')
      const proto = Array.isArray(value) ? [] : {}
      const newParentValue = NgEngineCore.defaultsDeep({[decedent]: value}, this.get(parent) || proto)
      this.map.set(key, value)
      // Recursively reverse flatten the set back up the tree
      return this._reverseFlattenSet(parent, newParentValue)
    }
    else {
      // This is as high as it goes
      return this.map.set(key, value)
    }
  }
  /**
   * Flattens what is being called to .set
   */
  private _flattenSet(key, value) {
    if (
      value !== null
      && value instanceof Object
      && typeof value !== 'function'
      && !Array.isArray(value)
    ) {
      // Flatten the new value
      const configEntries = Object.entries(NgEngineCore.flattenTree({[key]: value}))
      // Set the flat values
      configEntries.forEach(([_key, _value]) => {
        return this.map.set(_key, _value)
      })
    }
    // Reverse flatten up the tree
    return this._reverseFlattenSet(key, value)
  }
  /**
   * Throws IllegalAccessError if the configuration has already been set to immutable
   * and an attempt to set value occurs.
   */
  set (key: string, value: any) {
    if (this.immutable === true) {
      throw new IllegalAccessError('Cannot set properties directly on config. Use .set(key, value) (immutable)')
    }
    return this._flattenSet(key, value)
  }

  /**
   * Merge tree into this configuration if allowed. Return overwritten keys
   */
  merge (configTree: {[key: string]: any}, configAction = 'hold'): { hasKey: boolean, key: any }[] {
    const configEntries = Object.entries(NgEngineCore.flattenTree(configTree))
    return configEntries.map(([ key, value ]) => {
      const hasKey = this.has(key)
      // If the key has never been set, it is added to the config
      // If configAction is set to hold, then it will replace the initial config
      if (!hasKey || configAction === 'hold') {
        this.set(key, value)
      }
      // If configAction is set to merge, it will default values over the initial config
      else if (hasKey && configAction === 'merge') {
        if (value === null) {
          // Do Nothing
        }
        else if (typeof value === 'undefined') {
          // Do Nothing
        }
        else if (Array.isArray(value)) {
          // Do Nothing
        }
        else if (typeof value === 'number') {
          // Do Nothing
        }
        else if (typeof value === 'string') {
          // Do Nothing
        }
        else if (typeof value === 'function') {
          // Do Nothing
        }
        else {
          this.set(key, NgEngineCore.defaultsDeep(this.get(key), value))
        }
      }
      // If configAction is replaceable, and the key already exists, it's ignored completely
      // This is because it was set by a higher level app config
      else if (hasKey && configAction === 'replaceable') {
        // Do Nothing
      }
      return { hasKey, key }
    })
  }

  /**
   * Prevent changes to the app configuration
   */
  freeze () {
    this.immutable = true
  }

  /**
   * Allow changes to the app configuration
   */
  unfreeze () {
    this.immutable = false
  }
}

