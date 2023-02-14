const chatForm = document.getElementById('chat-form');
let msgList = document.getElementById('chat-messages');

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const roomID = localStorage.getItem('roomID');
  const roomN = localStorage.getItem('room');
  const userID = localStorage.getItem('userID');
  const username = localStorage.getItem('username');

  const userData = { username, userID };
  const roomData = { roomN, roomID };

  const messageText = e.target.elements.msg.value;
  // console.log(message);
  const message = { userData, roomData, messageText };
  // console.log(message);
  //sending a message to the server
  socket.emit('chatMessage', message);

  //clear text
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

const renderMsg = (message) => {
  let li = document.createElement('li');
  li.classList.add('message-li');
  li.textContent = `${message.userData.username}: ${message.messageText}`;

  if (message.userData.userID === localStorage.getItem('userID')) {
    li.classList.add('userMessage');
  }

  msgList.append(li);
};

socket.on('newMessage', (message) => {
  // console.log(message);
  renderMsg(message);
  // console.log(userData.username, messageText);
  //TODO need to fix this
  chatForm.scrollTop = chatForm.scrollHeight;
});

socket.on('botNotifications', (data) => {
  // console.log(data);
  let botMsg = document.createElement('li');
  botMsg.classList.add('bot-notification');
  botMsg.textContent = data;
  botMsg.setAttribute('id', 'bot');

  msgList.append(botMsg);
});
