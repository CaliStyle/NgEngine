import { Request, Response } from 'express'
// import { Controller } from 'trails-api'

const Controller = require('trails/controller')

/**
 * @module ViewController
 */

export class ViewController extends Controller {
  /**
   *
   * @param req
   * @param res
   */
  index(req: Request, res: Response) {
    this.app.log.debug(`ssr: ${req.originalUrl }`)
    res.render('index', { req, res })
  }
}
