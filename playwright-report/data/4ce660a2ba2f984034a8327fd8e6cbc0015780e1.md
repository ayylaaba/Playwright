# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/DeleteUserAccount.spec.js >> API 11: POST To Create/Register User Account >> API 11: POST To Create/Register User Account
- Location: tests/api/DeleteUserAccount.spec.js:6:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404
```

# Test source

```ts
  1  | 
  2  | import {test, expect} from '@playwright/test'
  3  | 
  4  | test.describe('API 11: POST To Create/Register User Account', () => {
  5  | 
  6  |     test('API 11: POST To Create/Register User Account', async ({request}) => {
  7  | 
  8  |         const response = await request.delete('https://automationexercise.com/api/deleteAccount', {
  9  |             form: {
  10 |                 name : "ayoub",
  11 |                 email : " charly@gmail.com",
  12 |                 password: 'Ayoub.123',
  13 |             }
  14 |         });
  15 | 
  16 |         expect(response.status()).toBe(200);
  17 |         const responseBody = await response.json();
  18 |         console.log(responseBody);
> 19 |         expect(responseBody.responseCode).toBe(200);
     |                                           ^ Error: expect(received).toBe(expected) // Object.is equality
  20 |         expect(responseBody.message).toBe('Account deleted!');
  21 |     
  22 |     })
  23 | });
  24 | 
```