const joinRoom = (room) => {
  const currentRoom = sessionStorage.roomID;
  if (currentRoom === room.roomID) return;

  socket.emit('joinRoom', room);

  localStorage.roomID = room.roomID;
  localStorage.roomName = room.name;
};

const roomBtn = document.createElement('button');

socket.on('renderRooms', (list) => {
  console.log(list);

  roomBtn.textContent = list.name;
  roomBtn.setAttribute('id', list.roomID);

  const rooms = document.getElementById('room-list');
  rooms.append(roomBtn);
});
