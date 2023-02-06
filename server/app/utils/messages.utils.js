const Room = require('../models/models.js');

const getMessages = async (room) => {
  let data;

  try {
    let roomData = '';
    let messages = '';

    if (room.roomId) {
      roomData = await Room.findOne({ _id: room.roomID });
    } else if (room.roomName) {
      roomData = await Room.findOne({ roomName: room.roomName });
    } else {
      throw new Error('Room information was not provided');
    }

    if (roomData.messages !== null) {
      messages = roomData.messages.map(({ user, room, text }) => ({
        user,
        room,
        text,
      }));
    }

    data = { success: 'true', messages };
  } catch (error) {
    data = { success: false, msg: error.message };
  }

  return data;
};

const newMessage = async (message) => {
  let data;
  try {
    // push message to Rooms messages array
    data = await Room.updateOne(
      { _id: message.room.roomID },
      { $push: { messages: message } }
    );

    data = { success: true, message };

    return data;
  } catch (error) {
    data = { success: false, msg: error.message };
  }

  return data;
};

module.exports = { getMessages, newMessage };
