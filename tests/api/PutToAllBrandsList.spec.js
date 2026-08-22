
import {test, expect} from '@playwright/test'


test.describe('API 4: PUT To All Brands List', () => {

    test('API 4: PUT To All Brands List', async ({request}) => {
      
        const response = await request.put('https://automationexercise.com/api/brandsList');

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        
        expect(responseBody.responseCode).toBe(405);
        
        expect(responseBody.message).toBe('This request method is not supported.');
    })
})
