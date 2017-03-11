import { ScratchPadPage } from './app.po';

describe('scratch-pad App', () => {
  let page: ScratchPadPage;

  beforeEach(() => {
    page = new ScratchPadPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
