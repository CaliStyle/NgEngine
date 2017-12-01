import 'reflect-metadata'
import 'zone.js/dist/zone-node'
import { enableProdMode } from '@angular/core'

enableProdMode()

const TrailsApp = require('trails')
const trails = require('./trailsConfig')
const server = new TrailsApp(trails)

server
  .start()
  .catch((err: any) => server.stop(err))
