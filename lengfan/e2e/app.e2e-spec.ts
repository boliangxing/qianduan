import { LengfanPage } from './app.po';

describe('lengfan App', function() {
  let page: LengfanPage;

  beforeEach(() => {
    page = new LengfanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
