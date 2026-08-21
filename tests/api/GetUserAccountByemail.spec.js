
import {test, expect} from '@playwright/test'

test.describe('API 14: GET user account detail by email', () => {
    test('API 14: GET user account detail by email', async ({request}) => {
        const response = await request.get('https://automationexercise.com/api/getUserDetailByEmail', {
            params: {
                email: "test1786461590230@example.com"
            }
        });
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);
        expect(responseBody.responseCode).toBe(200);
    })
});
