import axios from 'axios';

const btn = document.getElementById('btn');
const form = document.getElementById('login-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

const fetchData = async () => {
  try {
    const url = 'http://localhost:8080/api/users/';
    const config = {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'x-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZGNmMmRlYjgwZTVhYTBlNzkyMmYzZCIsImlhdCI6MTY3NTQyNDk5MCwiZXhwIjoxNjc1NTExMzkwfQ.Xucg2yJuNx7FYmEOvwOdzOvpT0MBA19_mPWAIAPc5fw',
      },
    };

    const { data } = await axios.get(url, config);
    console.log(data.userList);
  } catch (error) {
    console.log(error.message);
  }
};

const logIn = async (email, password) => {
  try {
    const url = 'http://localhost:8080/api/users/login';
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(url, { email, password }, config);
    console.log(data);
    alert('Signed In');
  } catch (error) {
    alert('Password or email invalid');
    console.log(error.message);
  }
};
// fetchData();

btn.addEventListener('click', () => {
  const em = email.value;
  const pass = password.value;
  logIn(em, pass);
});
