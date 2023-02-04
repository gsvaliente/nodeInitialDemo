const Room = require('../models/room.model');

const messagesRoom = async (room) => {
  let response;

  try {
    let roomData;
    let messages;

    if (room.roomID) {
      roomData = await Room.findOne({ _id: room.roomID });
    } else {
      throw new Error('room id not provided');
    }

    if (room.messages) {
    }
  } catch (error) {}
};
