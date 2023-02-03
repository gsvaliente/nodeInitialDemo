const form = document.getElementById('register-form');

const registerUser = async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const username = document.getElementById('username').value;

  try {
    const url = 'http://localhost:8080/api/users/register';
    const config = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    };
    const res = await fetch(url, config);
    const data = await res.json();

    const { msg } = data;

    if (data.success) {
      localStorage.setItem('x-token', data.token);
      alert('registration complete');
      window.location.assign('../index.html');
    } else {
      alert(`${msg[0].msg}`);
    }
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener('submit', registerUser);
