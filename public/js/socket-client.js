const textField = document.getElementById('txtMessage');
const button = document.getElementById('btnSend');

const socket = io();

socket.on('message', (message) => {
  console.log(message);
});

button.addEventListener('click', () => {
  const message = textField.value;

  //sending a message to the server
  socket.emit('chatMessage', message);
});
