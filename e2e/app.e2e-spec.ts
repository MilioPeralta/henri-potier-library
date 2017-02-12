import { HenriPotierLibraryPage } from './app.po';

describe('henri-potier-library App', function() {
  let page: HenriPotierLibraryPage;

  beforeEach(() => {
    page = new HenriPotierLibraryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
