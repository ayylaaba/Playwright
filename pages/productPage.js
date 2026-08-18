class ProductPage {
  constructor(page) {
    this.page = page;
    this.productTitle = page.locator('h2.title.text-center', { hasText: 'All Products' });
    this.products = page.locator('.product-image-wrapper');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.viewCart = page.locator('#cartModal').getByRole('link', { name: 'View Cart' });
    this.cartRows = page.locator('table tbody tr');
    this.emptyMessage = page.locator('.text-center b', { hasText: 'Cart is empty!' });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');

    // Review on product
    this.writeReviewLink = page.locator('a', { hasText: 'Write Your Review' });
    this.reviewerName = page.locator('input[id="name"]');
    this.reviewerEmail = page.locator('input[id="email"]');
    this.reviewText = page.locator('textarea[id="review"]');
    this.reviewSubmit = page.locator('button[id="button-review"]');
    this.reviewMessage = page.locator('.alert-success.alert').getByText('Thank you for your review.');

    // Product details page
    this.productName = page.locator('.product-information h2');
    this.category = page.locator('.product-information p').nth(0);
    this.availability = page.locator('.product-information p').nth(1);
    this.condition = page.locator('.product-information p').nth(2);
    this.brand = page.locator('.product-information p').nth(3);
  }

  async addProductToCart(index) {
    const product = this.products.nth(index);
    await product.hover();
    await product.locator('.add-to-cart').first().click();
  }

  // productId must be the REAL data-product-id from the DOM, not a loop index
  async removeProductFromCart(productId) {
    await this.page.locator(`a.cart_quantity_delete[data-product-id="${productId}"]`).click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async viewCartLink() {
    await this.viewCart.click();
  }

  async getRows() {
    return this.cartRows.count();
  }

  async viewProduct(productId = 1) {
    await this.page.locator(`a[href="/product_details/${productId}"]`).click();
  }

  async reviewProduct(name, email, review) {
    await this.reviewerName.fill(name);
    await this.reviewerEmail.fill(email);
    await this.reviewText.fill(review);
    await this.reviewSubmit.click();
  }
}

export default ProductPage;
