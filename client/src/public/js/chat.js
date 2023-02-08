const accessToken = localStorage.getItem('accessToken');

if (!accessToken) {
  alert('no credentials provided');
  window.location.assign('./index.html');
}

// localStorage.setItem('room', 'globalChat');
// localStorage.setItem('roomID', '63e2136da3b575e54c0f90f9');

const socket = io('http://localhost:8080', {
  query: {
    accessToken: localStorage.accessToken,
  },
});

socket.on('message', (message) => {
  console.log(message);
});
