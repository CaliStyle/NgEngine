/**
 * Exports the Fabrix Server
 */

import 'reflect-metadata'
import 'zone.js/dist/zone-node'
import { enableProdMode } from '@angular/core'
import { FabrixApp } from '@fabrix/fabrix'
enableProdMode()

import * as fabrixConfig from './fabrix.config'

const server = new FabrixApp(fabrixConfig)

server
  .start()
  .catch((err: any) => server.stop(err))
