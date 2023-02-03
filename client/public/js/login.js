import axios from 'axios';

const form = document.getElementById('login-form');

const loginUser = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const url = 'http://localhost:8080/api/users/login';
    const config = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const res = await fetch(url, config);
    const data = await res.json();

    if (data.success) {
      localStorage.setItem('x-token', data.token);
      alert('logged in');
      window.location.assign('../index.html');
    } else {
      alert(`${data.msg}`);
    }
  } catch (error) {
    console.log(error.message);
  }
};

form.addEventListener('submit', loginUser);
