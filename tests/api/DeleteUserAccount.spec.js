
import {test, expect} from '@playwright/test'

test.describe('API 11: POST To Create/Register User Account', () => {

    test('API 11: POST To Create/Register User Account', async ({request}) => {

        const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
            form: {
                name : "ayoub",
                email : " charly@gmail.com",
                password: 'Ayoub.123',
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('Account deleted!');
    
    })
});
