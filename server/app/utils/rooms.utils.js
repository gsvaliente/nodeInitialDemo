const Room = require('../models/room.model');

const getAllRooms = async () => {
  try {
    const rooms = await Room.find();
    const roomList = rooms.map(({ _id, name }) => {
      return { roomID: _id, name };
    });
    return { success: true, roomList };
  } catch (error) {}
};

const createRoom = async (name) => {
  try {
    const doesRoomExist = await Room.findOne({ name });

    if (doesRoomExist) {
      return { success: false, msg: 'room already exists' };
    }

    const newRoom = await Room.create({ name });
    return { success: true, newRoom };
  } catch (error) {
    return { success: false, msg: error.message };
  }
};

const globalChat = async () => {
  const doesGlobalExist = await Room.findOne({ name: 'globalChat' });

  if (!doesGlobalExist) {
    globalRoom = await Room.create({
      name: 'globalChat',
      messages: [],
      text: 'Welcome to ChatAPP',
    });
  }
};

module.exports = { getAllRooms, createRoom, globalChat };
