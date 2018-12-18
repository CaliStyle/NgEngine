import { union, defaultsDeep, isArray, toArray, mergeWith } from 'lodash'

export const Core = {
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
      return !!JSON.stringify(obj, Core.collector.bind(null, stack))
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
}
