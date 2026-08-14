class CategoryPage {
    constructor(page) {
      this.page = page;
      this.categoryTitle = page.getByRole('heading', { name: 'Category' });
  
      // Category headers (clicking these expands the accordion)
      this.womenCategoryLink = page.locator('a[href="#Women"]');
      this.menCategoryLink = page.locator('a[href="#Men"]');
  
      // Sub-links, scoped inside each category's own expanded panel -
      // avoids ambiguity if "Tops" or "Jeans" ever appears elsewhere
      this.womenSubLink = (name) => page.locator('#Women').getByRole('link', { name, exact: true });
      this.menSubLink = (name) => page.locator('#Men').getByRole('link', { name, exact: true });
  
      this.categoryProductsTitle = page.locator('h2.title.text-center');
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
  }
  
  export default CategoryPage;