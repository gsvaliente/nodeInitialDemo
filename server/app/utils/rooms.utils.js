const Room = require('../models/room.model');

const getAllRooms = async () => {
  try {
    const rooms = await Room.find();
    const roomList = rooms.map(({ _id, name }) => {
      return { roomID: _id, name };
    });
    return { success: true, roomList };
  } catch (error) {
    console.error(error.message);
  }
};

const createRoom = async (roomName) => {
  try {
    const newName = roomName.toLowerCase();
    console.log(newName);
    const doesRoomExist = await Room.findOne({ name: newName });

    if (doesRoomExist) {
      return { success: false, msg: 'room already exists' };
    }

    const newRoom = await Room.create({ name: newName });
    return {
      success: true,
      newRoom: { roomID: newRoom._id, name: newRoom.name },
    };
  } catch (error) {
    console.error(error.message);
  }
};

const globalChat = async () => {
  const doesGlobalExist = await Room.findOne({ name: 'globalChat' });

  if (!doesGlobalExist) {
    globalRoom = await Room.create({
      name: 'globalChat',
    });
  }
};

module.exports = { getAllRooms, createRoom, globalChat };
