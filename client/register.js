import axios from 'axios';

let email = document.getElementById('email');
let password = document.getElementById('password');
let username = document.getElementById('username');
const form = document.getElementById('register-form');

const registerUser = async (username, email, password) => {
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
    document.location.href = 'chat.html';
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let un = username.value;
  let em = email.value;
  let pass = password.value;

  if (!un || !em || !pass) {
    return alert('a field is missing');
  }

  registerUser(un, em, pass);
});
