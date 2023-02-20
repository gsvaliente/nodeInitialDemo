const signOut = document.querySelector('.logout-btn');

signOut.addEventListener('click', () => {
  const leave = confirm('Are you sure you want to leave?');
  if (leave) {
    localStorage.clear();
    window.location.assign('./index.html');
  }
});
