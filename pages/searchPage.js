import { expect } from '@playwright/test';
import ProductPage from './productPage.js';

class SearchProductPage {
  constructor(page) {
    this.page = page;
    this.productPage = new ProductPage(page);
    this.searchInput = page.locator('input[id="search_product"]');
    this.searchButton = page.locator('button[id="submit_search"]');
    this.verifySearchProductHeading = page.locator('h2', { hasText: 'Searched Products' });
  }

  async setSearchInput(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  // Step 8: Verify all products related to the search are visible
  async verifySearchResults(productName) {
    const searchResults = this.page.locator('.features_items .product-image-wrapper');
    const count = await searchResults.count();
    expect(count).toBeGreaterThan(0);

    const productNames = await this.page.locator('.features_items .productinfo p').allTextContents();
    for (const name of productNames) {
      expect(name.toLowerCase()).toContain(productName.toLowerCase());
    }
  }

  async addAllProductsToCart() {
    const searchResults = this.page.locator('.features_items .product-image-wrapper');
    const count = await searchResults.count();
    for (let i = 0; i < count; i++) {
      await this.productPage.addProductToCart(i);
      await this.productPage.clickContinueShopping();
    }
  }
}

export default SearchProductPage;
