const User = require('../models/user.model');

const getAllUsers = async (room) => {
  let list;
  try {
    const userList = await User.find({ 'room.roomID': room.roomID });

    const users = userList.map(({ _id, username }) => {
      return { userID: _id, username };
    });
    list = { success: true, list };
  } catch (error) {
    list = { success: false, msg: error.message };
  }
  return list;
};

const disconnectUser = async (user) => {
  let data;

  try {
    const disconnect = await User.findOneAndUpdate(
      { _id: user.userID },
      { 'room.roomID': null, 'room.roomName': null }
    );

    if (disconnect) {
      data = { success: true, user, room: disconnect.room };
    } else {
      data = { status: 'fail', message: 'no ID found' };
    }
  } catch (error) {
    data = { success: false, message: error.message };
  }

  return data;
};

const joinRoom = async (user, room) => {
  let data;

  try {
    const currentUser = await User.findOneAndUpdate(
      { _id: user.userID },
      { 'room.roomID': room.roomID, 'room.roomName': room.roomName }
    );

    if (currentUser) {
      data = {
        success: true,
        user: { userID: currentUser._id, username: currentUser.username },
        oldRoom: currentUser.room,
      };
    } else {
      data = { success: false, msg: 'could not join room' };
    }
  } catch (error) {
    data = { success: false, msg: error.message };
  }

  return data;
};

module.exports = {
  getAllUsers,
  disconnectUser,
  joinRoom,
};
