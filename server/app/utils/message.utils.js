const Room = require('../models/room.model');

const saveMessage = async (message) => {
  try {
    await Room.updateOne(
      { _id: message.roomData.roomID },
      { $push: { messages: message } }
    );
    return { success: true, message };
  } catch (error) {
    console.error(error.message);
  }
};

const getRoomMessages = async (room) => {
  try {
    const selectedRoom = await Room.findOne({ _id: room.roomID });
    const { messages } = selectedRoom;
    const data = messages.map(({ userData, roomData, messageText }) => {
      return { userData, roomData, messageText };
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { getRoomMessages, saveMessage };
