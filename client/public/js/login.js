import axios from 'axios';

const form = document.getElementById('login-form');

const loginUser = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const url = 'http://localhost:8080/api/users/login';
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(url, { email, password }, config);

    console.log(data);

    if (data.success) {
      localStorage.setItem('x-token', data.token);
      alert('logged in');
      window.location.assign('./chat.html');
    } else {
      console.log('error');
    }
  } catch (error) {
    console.log(error.message);
  }
};

form.addEventListener('submit', loginUser);
