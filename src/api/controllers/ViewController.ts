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
    console.log('I WAS CALLED')
    res.render('index', { req })
  }
}
