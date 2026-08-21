
import {test, expect} from '@playwright/test'

test.describe('API 11: POST To Create/Register User Account', () => {
    test('API 11: POST To Create/Register User Account', async ({request}) => {
        const response = await request.put('https://automationexercise.com/api/updateAccount', { 
            form: {
                name : "ayoub",
                email : "test1786461590230@example.com",
                password: 'Password.123',
                title : "Mr",
                birth_date : "12",
                birth_month : "01",
                birth_year : "2001",
                firstname : "ayoub",
                lastname : "laabad",
                company : "javil",
                address1 : "hay ifriquaia 23",
                address2 : "hay ifriquaia 23",
                country : "France",
                zipcode : "42399",
                state : "Paris 74 eur",
                city : "Paris",
                mobile_number : "2126418293"
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User updated!');
    })
});