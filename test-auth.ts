import 'dotenv/config';
import { app } from './server/api';

async function runTest() {
  const email = `usuario_test_${Date.now()}@prueba.com`;
  const password = 'mypassword123';

  console.log('1. Probando REGISTRO sin confirmación...');
  const regReq = new Request('http://localhost/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Usuario Test',
      email: email,
      password: password
    })
  });

  let res = await app.fetch(regReq);
  let data = await res.json();
  console.log(`[STATUS ${res.status}] Usuario creado:\n`, data.user);

  console.log('\n2. Probando INICIO DE SESIÓN real con correo y contraseña...');
  const loginReq = new Request('http://localhost/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password
    })
  });

  res = await app.fetch(loginReq);
  data = await res.json();
  console.log(`[STATUS ${res.status}] Login exitoso. Token recibido:\n`, data.token);

  if (data.token) {
    console.log('\n3. Probando SESIÓN ACTIVA (usando el token)...');
    const meReq = new Request('http://localhost/api/auth/me', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${data.token}` }
    });
    
    res = await app.fetch(meReq);
    const meData = await res.json();
    console.log(`[STATUS ${res.status}] Sesión verificada:\n`, meData);
  }
}

runTest();
