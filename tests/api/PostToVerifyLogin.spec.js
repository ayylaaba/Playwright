
import {test, expect} from '@playwright/test'

test.describe('API 5: POST To Search Product', () => {

    test('API 5: POST To Search Product', async ({request}) => {
      
        const response = await request.post('https://automationexercise.com/api/verifyLogin', {
            form: {
                 email : 'nour12@gmail.com',
                 password: 'Ayoub.123'
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        
        expect(responseBody.responseCode).toBe(200);
        
        expect(responseBody.message).toBe('User exists!');
    }),

    test('API 8: POST To Verify Login without email parameter', async ({request}) => {
      
        const response = await request.post('https://automationexercise.com/api/verifyLogin', {
            form: {
                 password: 'Ayoub.123'
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        
        expect(responseBody.responseCode).toBe(400);
        
        expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
    })

});