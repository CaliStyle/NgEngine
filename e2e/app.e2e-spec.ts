import { AppPage } from './app.po'

describe('proxy-engine-ng App', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('should display welcome message', () => {
    page.navigateTo()
    expect(page.getParagraphText()).toEqual('Welcome to Proxy Engine with Angular!')
  })
})