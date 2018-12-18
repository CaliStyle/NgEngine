import { merge, union, defaultsDeep, isArray, toArray, mergeWith } from 'lodash'
import { ConfigValueError } from './ng-engine.errors'

export const NgEngineCore = {
  // An Exception convenience
  BreakException: {},

  defaultsDeep: (...args) => {
    const output = {}
    toArray(args).reverse().forEach(function (item) {
      mergeWith(output, item, function (objectValue, sourceValue) {
        return isArray(sourceValue) ? sourceValue : undefined
      })
    })
    return output
  },

  collector: (stack, key, val) => {
    let idx: any = stack[stack.length - 1].indexOf(key)
    try {
      const props: any = Object.keys(val)
      if (!props.length) {
        throw props
      }
      props.unshift({idx: idx})
      stack.push(props)
    }
    catch (e) {
      while (!(stack[stack.length - 1].length - 2)) {
        idx = stack[stack.length - 1][0].idx
        stack.pop()
      }

      if (idx + 1) {
        stack[stack.length - 1].splice(idx, 1)
      }
    }
    return val
  },

  isNotCircular: (obj) => {
    let stack = [[]]

    try {
      return !!JSON.stringify(obj, NgEngineCore.collector.bind(null, stack))
    }
    catch (e) {
      if (e.message.indexOf('circular') !== -1) {
        let idx = 0
        let path = ''
        let parentProp = ''
        while (idx + 1) {
          idx = stack.pop()[0].idx
          parentProp = stack[stack.length - 1][idx]
          if (!parentProp) {
            break
          }
          path = '.' + parentProp + path
        }
      }
      return false
    }
  },

  initialResources (tree, resources = []) {
    if (tree.hasOwnProperty('main') && tree.main.hasOwnProperty('resources')) {
      // Configs with Array will throw a warning in v2.0 and an error in v3.0
      if (!isArray(tree.main['resources'])) {
        throw new ConfigValueError('if set, main.resources must be an array')
      }
      return tree.main['resources']
    }
    else {
      return resources
    }
  },

  flattenTree (tree = { }) {
    const toReturn: { [key: string]: any } = {}
    // Try to flatten and fail if unable to resolve circular object
    try {
      Object.entries(tree).forEach(([k, v]) => {
        // if (typeof v === 'object' && v !== null) {
        if (
          v !== null
          && v instanceof Object
          && typeof v !== 'function'
        ) {
          // If value is an array, flatten by index and don't try to flatten further
          // Configs with Array will throw a warning in a later version
          if (Array.isArray(v)) {
            v.forEach((val, i) => {
              toReturn[`${k}.${i}`] = val
            })
          }
          else if (!NgEngineCore.isNotCircular(v)) {
            toReturn[k] = v
          }
          // If the value is a normal object, keep flattening
          else {
            const flatObject = NgEngineCore.flattenTree(v)
            Object.keys(flatObject).forEach(flatKey => {
              toReturn[`${k}.${flatKey}`] = flatObject[flatKey]
            })
          }
        }
        // Other wise, the value is a function, string, or number etc and should stop flattening
        toReturn[k] = v
      })

      // Return the consturcted return object
      return toReturn
    }
    catch (err) {
      if (err !== NgEngineCore.BreakException) {
        throw new RangeError('Tree is circular and can not be resolved, check that there are no circular references in the config')
      }
      return toReturn
    }
  },

  /**
   * Copy and merge the provided configuration into a new object, decorated with
   * necessary default and environment-specific values.
   */
  buildConfig (initialConfig: {env?: {[key: string]: any}} = { }, appEnv?: string) {
    const envConfig = initialConfig.env && initialConfig.env[appEnv] || { }

    const configTemplate = {
      resources: NgEngineCore.initialResources(initialConfig),
      lockResources: false,
      main: {
        packs: [ ],
        paths: {
          root: ''
        },
        freezeConfig: true,
        createPaths: true
      }
    }
    return merge(configTemplate, initialConfig, envConfig, { env: appEnv })
  }
}
