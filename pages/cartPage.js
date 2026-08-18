class CartPage {
  constructor(page) {
    this.page = page;
    this.cartRows = page.locator('#cart_info_table tbody tr');
    this.recommendedProductsTitle = page.locator('h2', { hasText: 'recommended items' });
    this.recommendedProducts = page.locator('#recommended-item-carousel .product-image-wrapper');
  }

  async getRowCount() {
    return this.cartRows.count();
  }

  async getProductName(rowIndex) {
    return this.cartRows.nth(rowIndex).locator('.cart_description h4 a').innerText();
  }

  async getProductPrice(rowIndex) {
    return this.cartRows.nth(rowIndex).locator('.cart_price p').innerText();
  }

  async getProductQuantity(rowIndex) {
    return this.cartRows.nth(rowIndex).locator('.cart_quantity button').innerText();
  }

  async getProductTotalPrice(rowIndex) {
    return this.cartRows.nth(rowIndex).locator('.cart_total .cart_total_price').innerText();
  }

  async addRecommendationToCart(index) {
    const product = this.recommendedProducts.nth(index);
    await product.hover();
    await product.locator('.add-to-cart').first().click();
  }
}

export default CartPage;
