import { test, expect } from '@playwright/test';

test.describe('API 9: DELETE To Verify Login', () => {
    
    test('API 9: DELETE To Verify Login', async ({ request }) => {
        const response = await request.delete('https://automationexercise.com/api/verifyLogin');
        
        // Check status
        expect(response.status()).toBe(200);

        // Optional: Check response body
        const responseBody = await response.json();

        // Check responseCode
        expect(responseBody.responseCode).toBe(405);

        // Check response structure
        expect(responseBody.message).toBe('This request method is not supported.');
    });
});