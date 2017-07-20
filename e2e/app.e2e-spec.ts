import { AngularMTRPage } from './app.po';

describe('angular-mtr App', () => {
  let page: AngularMTRPage;

  beforeEach(() => {
    page = new AngularMTRPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
