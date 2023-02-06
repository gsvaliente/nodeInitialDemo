const Room = require('../models/room.model');

const createRoom = async (roomName) => {
  let createdRoom;
  try {
    const roomExists = await Room.findOne({ roomName });

    if (roomExists) {
      createRoom = { success: false, msg: 'room already exists' };
    } else {
      const room = await Room.create({ roomName });
      createdRoom = {
        success: true,
        room: { _id: room._id, roomName: room.roomName },
      };
    }
  } catch (error) {
    createRoom = { success: false, msg: error.message };
  }

  return createdRoom;
};

const getAllRooms = async () => {
  let roomList;

  try {
    let rooms = await Rooms.find({});

    rooms = rooms.map(({ _id, roomName }) => {
      return { _id, roomName };
    });

    roomList = { success: true, rooms };
  } catch (error) {
    roomList = { success: false, msg: error.message };
  }

  return roomList;
};

module.exports = {
  createRoom,
  getAllRooms,
};
