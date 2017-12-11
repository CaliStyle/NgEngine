import * as path from 'path'
import { merge } from 'lodash'

// const ConfigurationProxyHandler = {
//   get (target, key) {
//     if (target.has && target.has(key)) {
//       const value = target.immutable === true ? Object.freeze(target.get(key)) : target.get(key)
//       return new Proxy(value, ConfigurationProxyHandler)
//     }
//     else {
//       return target.immutable === true ? Object.freeze(target[key]) : target[key]
//     }
//   }
// }

export class NgConfig extends Map {

  public immutable: boolean
  public env: {}

  constructor (configTree = { }, processEnv = { }) {
    const config = NgConfig.buildConfig(configTree)
    const configEntries = Object.entries(NgConfig.flattenTree(config))
    super(configEntries)
    // super()

    this.validateConfig(config)

    this.immutable = false
    this.env = processEnv

    this.get = this.get.bind(this)
    this.set = this.set.bind(this)
    this.entries = this.entries.bind(this)
    this.has = this.has.bind(this)

    return this
    // return new Proxy(this, ConfigurationProxyHandler)
  }

  /**
   * Flattens configuration tree
   */
  static flattenTree (tree = { }) {
    const toReturn = { }

    Object.entries(tree).forEach(([ k, v ]) => {
      if (typeof v === 'object' && v !== null) {
        const flatObject = NgConfig.flattenTree(v)
        Object.keys(flatObject).forEach(flatKey => {
          toReturn[`${k}.${flatKey}`] = flatObject[flatKey]
        })
      }
      toReturn[k] = v
    })
    return toReturn
  }

  /**
   * Copy and merge the provided configuration into a new object, decorated with
   * necessary default and environment-specific values.
   */
  static buildConfig (initialConfig: {env?: string} = { }, appEnv?) {
    const root = path.resolve(path.dirname(require.main.filename))
    const temp = path.resolve(root, '.tmp')
    const envConfig = initialConfig.env && initialConfig.env[appEnv]

    const configTemplate = {
      main: {
        packs: [ ],
        paths: {
          root: root,
          temp: temp
        },
        freezeConfig: true,
        createPaths: true
      },
      log: { }
    }

    const mergedConfig = merge(configTemplate, initialConfig, (envConfig || { }))
    mergedConfig.env = appEnv

    return mergedConfig
  }

  set (key, value) {
    if (this.immutable === true) {
      // throw new IllegalAccessError('Cannot set properties directly on config. Use .set(key, value) (immutable)')
    }
    return super.set(key, value)
  }

  /**
   * Merge tree into this configuration. Return overwritten keys
   */
  merge (configTree) {
    const configEntries = Object.entries(NgConfig.flattenTree(configTree))
    return configEntries.map(([ key, value ]) => {
      const hasKey = this.has(key)
      this.set(key, value)

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

  /**
   * Validate the structure and prerequisites of the configuration object. Throw
   * an Error if invalid; invalid configurations are unrecoverable and require
   * that the programmer fix them.
   */
  validateConfig (config) {
    // const result = joi.validate(config, schemas.config)
    // if (result.error) {
    //   throw new ValidationError('Project Configuration Error', result.error.details)
    // }
  }
}
