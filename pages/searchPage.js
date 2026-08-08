class SearchProductPage {
   constructor(page) {
        this.page = page;
        this.searchInput = page.locator('input[id="search_product"]');
        this.searchButton = page.locator('button[id="submit_search"]');
        this.verfiySearchProduct = page.locator('h2', { hasText: 'Searched Products' });
    }

    async setSearchInput(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    // Step 8: Verify all products related to the search are visible
    async verifySearchResults(productName) {
        const searchResults = this.page.locator('.features_items .product-image-wrapper');
        const count = await searchResults.count();

        // There should be at least one result for the searched product
        expect(count).toBeGreaterThan(0);

        // Stronger check: every visible product name should actually
        // contain what we searched for
        const productNames = await this.page.locator('.features_items .productinfo p').allTextContents();
        for (const name of productNames) {
            expect(name.toLowerCase()).toContain(productName.toLowerCase());
        }
    }
}

export default SearchProductPage;
