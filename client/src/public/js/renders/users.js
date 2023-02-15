socket.emit('onlineUsers');

const userList = document.getElementById('user-list');
socket.on('reloadUsers', (usersList) => {
  const { users } = usersList;
  // console.log(users);

  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join('')}
  `;
});
