import { createApiKey, login, register } from './api/auth';

async function testAuth() {
  try {
    const newUser = await register({
      name: 'tamek',
      email: 'tamek@stud.noroff.no',
      password: 'tamek1234',
      venueManager: false,
    });
    console.log('Registered user:', newUser);

    const accessToken = await login('tamek@stud.noroff.no', 'tamek1234');
    console.log('Access Token:', accessToken);

    const apiKey = await createApiKey(accessToken);
    console.log('API Key:', apiKey);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAuth();
