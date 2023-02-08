socket.emit('onlineUsers');

const userList = document.getElementById('user-list');
socket.on('renderUser', (user) => {
  console.log(user);
  const userEl = document.createElement('li');
  userEl.textContent = user.username;
  userEl.setAttribute('id', user._id);

  userList.append(userEl);
});
