
class ProductPage {
    constructor(page) {
      this.page = page;
      this.productTitle = page.locator('h2.title.text-center', { hasText: 'All Products' });
      this.products = page.locator('.product-image-wrapper');
      this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
      this.viewCart = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
      this.CartRows = page.locator('table tbody tr'); 
      this.emptyMessage = page.locator('.text-center b', { hasText: 'Cart is empty!' })
    }
  
    async addProductToCart(index) {
      const product = this.products.nth(index);
      await product.hover();
      await product.locator('.add-to-cart').first().click();
    }
  
    async removeProductFromCart(index) {
      await this.page.locator(`a[data-product-id="${index}"]`).click();
    }

    async clickContinueShopping() {
      await this.continueShoppingButton.click();
    }
  
    async viewCartLink() {
      await this.viewCart.click();
    }

    async getRows(){
        return this.CartRows.count();
    }

  }
  
  export default ProductPage;
