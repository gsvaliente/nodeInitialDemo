const chatForm = document.getElementById('chat-form');

const socket = io();

//message from server
socket.on('message', (message) => {
  // console.log(message);
  outputMessage(message);
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = e.target.elements.msg.value;

  //sending a message to the server
  socket.emit('chatMessage', message);
});

// output message to dom
const outputMessage = (message) => {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">Stefano <span>10:10am</span></p>
  <p class="text">${message}</p>`;

  document.querySelector('.chat-messages').appendChild(div);
};
