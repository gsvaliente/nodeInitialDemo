//GETTING VALUES AND SETTING VALUES
const roomForm = document.getElementById('room-form');
let roomName = document.getElementById('newRoom');
const roomHeader = document.getElementById('room-name');
let chatMessages = document.getElementById('chat-messages');

const joinRoom = (room) => {
  if (localStorage.getItem('roomID') === room.roomID) return;

  socket.emit('joinRoom', room);

  localStorage.setItem('room', room.name);
  localStorage.setItem('roomID', room.roomID);

  roomHeader.innerHTML = room.name;
  chatMessages.innerHTML = '';
};

socket.emit('getRooms');

socket.on('renderRoom', (room) => {
  const roomBtn = document.createElement('button');

  if (room.name === 'globalChat') {
    roomBtn.classList.add('active-room');
    joinRoom(room);
  }
  roomBtn.textContent = room.name;
  roomBtn.setAttribute('id', room.roomID);
  roomBtn.classList.add('room-btn');

  roomBtn.addEventListener('click', () => {
    if (localStorage.getItem('roomID')) {
      document
        .getElementById(localStorage.roomID)
        .classList.remove('active-room');
    }

    roomBtn.classList.add('active-room');
    joinRoom(room);
  });

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

socket.on('error', (error) => {
  alert(error);
});
