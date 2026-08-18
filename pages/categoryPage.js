class CategoryPage {
  constructor(page) {
    this.page = page;
    this.categoryTitle = page.getByRole('heading', { name: 'Category' });
    this.brandTitle = page.getByRole('heading', { name: 'Brands' });

    this.womenCategoryLink = page.locator('a[href="#Women"]');
    this.menCategoryLink = page.locator('a[href="#Men"]');

    this.womenSubLink = (name) => page.locator('#Women').getByRole('link', { name, exact: true });
    this.menSubLink = (name) => page.locator('#Men').getByRole('link', { name, exact: true });

    this.brandLink = (name) => page.locator(`a[href="/brand_products/${name}"]`);

    this.categoryProductsTitle = page.locator('h2.title.text-center');
    this.brandProductsTitle = page.locator('h2.title.text-center');
  }

  async openWomenCategory() {
    await this.womenCategoryLink.click();
  }

  async openMenCategory() {
    await this.menCategoryLink.click();
  }

  async selectWomenSubCategory(name) {
    await this.womenSubLink(name).click();
  }

  async selectMenSubCategory(name) {
    await this.menSubLink(name).click();
  }

  async openBrand(name) {
    await this.brandLink(name).click();
  }
}

export default CategoryPage;
