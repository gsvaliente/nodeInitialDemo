const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const params = new URLSearchParams(window.location.search);
const username = params.get('username');
const room = params.get('room');

const socket = io();

//joining a chat room

socket.emit('joinRoom', { username, room });

//get room and users
socket.on('usersRoom', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//message from server
socket.on('message', (message) => {
  // console.log(message);
  outputMessage(message);

  //format when receiving a message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.elements.msg.value;

  //sending a message to the server
  socket.emit('chatMessage', message);

  //clear text
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// output message to dom
const outputMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">${message.message}</p>`;

  document.querySelector('.chat-messages').appendChild(div);
};

const outputRoomName = (room) => {
  roomName.innerText = room;
};

const outputUsers = (users) => {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join('')}
  `;
};
