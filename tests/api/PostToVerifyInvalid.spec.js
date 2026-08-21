
import {test, expect} from '@playwright/test'

test.describe('API 10: POST To Verify Login with invalid details', () => {

    test('API 10: POST To Verify Login with invalid details', async ({request}) => {
      
        const response = await request.post('https://automationexercise.com/api/verifyLogin', {
            form: {
                email : " wrongEmail@gmail.com",
                password: 'Ayoub.123'
            }
        });

        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        console.log(responseBody);
        
        expect(responseBody.responseCode).toBe(404);
        
        expect(responseBody.message).toBe('User not found!');
    })

});