const Room = require('../models/room.model');

const createRoom = async (roomName) => {
  let response;

  try {
    const roomExists = await Room.findOne({ roomName });

    if (roomExists) {
      response = { success: true, msg: 'room already exists' };
    } else {
      const room = await Room.create({ roomName });
      response = {
        success: true,
        room: { roomID: room._id, roomName: room.roomName },
      };
    }
  } catch (error) {
    response = { success: false, msg: error.message };
  }

  return response;
};

const getAllRooms = async () => {
  let response;

  try {
    let roomList = await Room.find({});
    roomList = roomList.map(({ _id, roomName }) => {
      return { roomID: _id, roomName };
    });
    response = { success: true, roomList };
  } catch (error) {
    response = { success: false, msg: error.message };
  }

  return response;
};

module.exports = { createRoom, getAllRooms };
