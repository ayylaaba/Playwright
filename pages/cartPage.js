class CartPage {
    constructor(page) {
      this.page = page;
      this.cartRows = page.locator('#cart_info_table tbody tr');
    }
  
    async getRowCount() {
      return this.cartRows.count();
    }
  
    // Each of these reads data OUT of one specific row (by position)
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
  }
  
  export default CartPage;