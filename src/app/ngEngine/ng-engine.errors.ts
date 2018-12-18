export class IllegalAccessError extends Error {
  constructor(msg: string) {
    super(msg)
  }

  get name () {
    return 'IllegalAccessError'
  }
}

export class ConfigValueError extends RangeError {
  constructor(msg: string) {
    super(msg)
  }

  get name () {
    return 'ConfigValueError'
  }
}
