'use strict'
/* global describe, it */
const assert = require('assert')
const supertest = require('supertest')

describe('Public ViewController', () => {
  let request, publicUser

  before((done) => {
    request = supertest('http://localhost:3000')
    publicUser = supertest.agent(global.app.packs.express.server)

    done()
  })

  it('should exist', () => {
    assert(global.app.api.controllers['ViewController'])
  })

  it('should get home page', (done) => {
    publicUser
      .get('/')
      .expect(200)
      .end((err, res) => {
        done(err)
      })
  })
})
