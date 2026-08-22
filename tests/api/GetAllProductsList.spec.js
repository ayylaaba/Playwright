import { test, expect } from '@playwright/test';

test.describe('API 1: Get All Products List', () => {
    
    test('Get all products should return 200 OK', async ({ request }) => {
        const response = await request.get('https://automationexercise.com/api/productsList');
        
        // Check status
        expect(response.status()).toBe(200);

        // Optional: Check response body
        const responseBody = await response.json();

        // Check response structure
        expect(responseBody).toHaveProperty('products');
    });
});