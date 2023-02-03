import axios from 'axios';

const form = document.getElementById('register-form');

const registerUser = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;

  try {
    const url = 'http://localhost:8080/api/users/register';
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      url,
      { username, email, password },
      config
    );
    console.log(data);

    if (data.success) {
      localStorage.setItem('x-token', data.token);
      alert('registration complete');
      window.location.assign('./chat.html');
    } else {
      alert('something went wrong');
    }
  } catch (error) {
    console.log(error.message);
  }
};

form.addEventListener('submit', registerUser);
