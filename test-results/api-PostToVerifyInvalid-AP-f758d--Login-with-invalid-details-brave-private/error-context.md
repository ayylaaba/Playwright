# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/PostToVerifyInvalid.spec.js >> API 10: POST To Verify Login with invalid details >> API 10: POST To Verify Login with invalid details
- Location: tests/api/PostToVerifyInvalid.spec.js:6:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200
```

# Test source

```ts
  1  | 
  2  | import {test, expect} from '@playwright/test'
  3  | 
  4  | test.describe('API 10: POST To Verify Login with invalid details', () => {
  5  | 
  6  |     test('API 10: POST To Verify Login with invalid details', async ({request}) => {
  7  |       
  8  |         const response = await request.post('https://automationexercise.com/api/verifyLogin', {
  9  |             form: {
  10 |                 email : " wrongEmail@gmail.com",
  11 |                 password: 'Ayoub.123'
  12 |             }
  13 |         });
  14 | 
  15 |         expect(response.status()).toBe(200);
  16 | 
  17 |         const responseBody = await response.json();
  18 | 
  19 |         console.log(responseBody);
  20 |         
> 21 |         expect(responseBody.responseCode).toBe(404);
     |                                           ^ Error: expect(received).toBe(expected) // Object.is equality
  22 |         
  23 |         expect(responseBody.message).toBe('User not found!');
  24 |     })
  25 | 
  26 | });
```