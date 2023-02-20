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
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      localStorage.clear();
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('userID', data.user._id);
      localStorage.setItem('username', data.user.username);
      alert('registration complete');
      window.location.assign('./chat.html');
    } else {
      alert(`Oops something went wrong!`);
    }
  } catch (error) {
    console.log(error);
  }
};

form.addEventListener('submit', registerUser);
