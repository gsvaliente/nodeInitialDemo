const accessToken = localStorage.getItem('accessToken');

if (!accessToken) {
  alert('no credentials provided');
  window.location.assign('./index.html');
}

const socket = io('http://localhost:8080', {
  query: {
    accessToken: localStorage.accessToken,
  },
});

socket.emit('getRooms');

socket.on('message', (message) => {
  console.log(message);
});
