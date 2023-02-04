import outputMessage from './helpers/outputMessage';

const accessToken = localStorage.getItem('accessToken');

if (!accessToken) {
  alert('Need to sign in');
  window.location.assign('./public/login.html');
}

const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io('http://localhost:8080', {
  reconnectionDelayMax: 10000,
  query: {
    accessToken: localStorage.accessToken,
  },
});

socket.on('message', (message) => {
  // console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = e.target.elements.msg.value;

  socket.emit('newMessage', message);
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});
