//GETTING VALUES AND SETTING VALUES
const roomForm = document.getElementById('room-form');
let roomName = document.getElementById('newRoom');

const joinRoom = (room) => {
  const currentRoom = sessionStorage.roomID;
  if (currentRoom === room.roomID) return;

  socket.emit('joinRoom', room);

  localStorage.roomID = room.roomID;
  localStorage.roomName = room.name;
};

socket.emit('getRooms');

socket.on('renderRoom', (room) => {
  const roomBtn = document.createElement('button');

  roomBtn.textContent = room.name;
  roomBtn.setAttribute('id', room.roomID);

  const rooms = document.getElementById('room-list');
  rooms.append(roomBtn);
});

const createRoom = async (e) => {
  e.preventDefault();

  const name = roomName.value;
  console.log(name);

  if (!name) {
    return console.log('no name provided');
  }

  const approve = confirm(`Are you sure you want to create ${name}`);
  if (!approve) {
    return console.log('cancelled process');
  }

  socket.emit('createRoom', name);

  e.target.elements.newRoom.value = '';
};

roomForm.addEventListener('submit', createRoom);
