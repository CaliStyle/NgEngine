export interface NgEngineConfiguration {
  environment?: {[key: string]: any},
  appConfig?: {[key: string]: any}
}

export const DefaultNgEngineConfiguration: NgEngineConfiguration = {
  environment: {
    development: true,
    staging: false,
    testing: false,
    production: false
  },
  appConfig: {}
}
