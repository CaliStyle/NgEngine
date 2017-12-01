import { AppPage } from './app.po'

describe('proxy-engine-ng App', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('should display welcome message', () => {
    page.navigateTo('/')
    expect(page.getElementText('app-root h1')).toEqual('Welcome to Proxy Engine with Angular!')
  })
})
