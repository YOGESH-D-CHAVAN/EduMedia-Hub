
const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: body }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function test() {
  const timestamp = Date.now();
  const username = "testuser" + timestamp;
  const email = "testuser" + timestamp + "@example.com";
  const password = "password123";

  console.log("Registering user:", email);

  try {
    const regData = JSON.stringify({
      username,
      email,
      password,
      role: "student"
    });

    const regRes = await request({
      hostname: 'localhost',
      port: 5001,
      path: '/api/v1/users/registerUser',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': regData.length
      }
    }, regData);

    console.log("Register Status:", regRes.statusCode);
    console.log("Register Body:", regRes.body);

    if (regRes.statusCode === 201) {
      console.log("Registration success. Attempting login...");
      
      const loginData = JSON.stringify({
        email,
        password,
        role: "student"
      });

      const loginRes = await request({
        hostname: 'localhost',
        port: 5001,
        path: '/api/v1/users/loginUser',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': loginData.length
        }
      }, loginData);

      console.log("Login Status:", loginRes.statusCode);
      console.log("Login Body:", loginRes.body);
    } else {
      console.log("Registration failed, skipping login test.");
    }
  } catch (err) {
    console.error("Request error:", err.message);
  }
}

test();
