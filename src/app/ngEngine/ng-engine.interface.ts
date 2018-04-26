export interface NgEngineConfiguration {
  appConfig?: {[key: string]: any}
}

export const DefaultNgEngineConfiguration: NgEngineConfiguration = {
  appConfig: {
    environment: {
      development: true,
      staging: false,
      testing: false,
      production: false
    }
  }
}
