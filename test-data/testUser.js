
  function generateTestUser() {
    const unique = Date.now();
    return {
      name: `test${unique}`,
      email: `test${unique}@example.com`,
      password: 'Password.123',
    };
}
export default generateTestUser;
  