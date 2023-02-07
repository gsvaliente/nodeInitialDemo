console.log('hello world');

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
    const response = await fetch(url, config);
    const data = await response.json();
    console.log(data);
    console.log(data.token);

    if (data.success) {
      localStorage.clear();
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('userID', data.user._id);
      localStorage.setItem('username', data.user.username);
      alert('logged in');
      window.location.assign('./chat.html');
    } else {
      alert(`${data.msg}`);
    }
  } catch (error) {
    console.error(error.message);
  }
};

form.addEventListener('submit', loginUser);
