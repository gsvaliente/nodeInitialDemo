const socket = io('http://localhost:8080', {
  reconnectionDelayMax: 10000,
});

socket.on('message', (message) => {
  console.log(message);
});
