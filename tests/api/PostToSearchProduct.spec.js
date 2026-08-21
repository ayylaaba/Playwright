
import {test, expect} from '@playwright/test'

test.describe('API 5: POST To Search Product', () => {

    test('API 5: POST To Search Product', async ({request}) => {
      
        const response = await request.post('https://automationexercise.com/api/searchProduct', {
            form: {
                 search_product : 'fancy'
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log(responseBody);
        
        expect(responseBody.responseCode).toBe(200);
        
        expect(responseBody).toHaveProperty('products');
    })

    test('API 6: POST To Search Product without search_product parameter', async ({request}) => {
      
        const response = await request.post('https://automationexercise.com/api/searchProduct');

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log(responseBody);
        
        expect(responseBody.responseCode).toBe(400);
        
        expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
    })
})

