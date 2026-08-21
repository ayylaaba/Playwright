
import {test, expect} from '@playwright/test'


test.describe('POST To All Products List', () => {

    test('API 2: POST To All Products List', async ({request}) => {
      
        const response = await request.post('https://automationexercise.com/api/productsList');

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log(responseBody);
        
        expect(responseBody.responseCode).toBe(405);
        
        expect(responseBody.message).toBe('This request method is not supported.');
    })

})

