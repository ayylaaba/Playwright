import { test, expect } from '@playwright/test';

test.describe('API 3: Get All Brands List', () => {

    test('API 3: Get All Brands List', async ({ request }) => {

        const response = await request.get('https://automationexercise.com/api/brandsList');
        
        // Check status
        expect(response.status()).toBe(200);

        // Optional: Check response body
        const responseBody = await response.json();
        console.log(responseBody);

        // Check response structure
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody).toHaveProperty('brands');
    });
});