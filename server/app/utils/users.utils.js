const User = require('../models/user.model');

const userJoinRoom = async (user, room) => {
  try {
    const currentUser = await User.findByIdAndUpdate(
      { _id: user.userID },
      { 'room.roomID': room.roomID, 'room.name': room.name }
    );
    if (!currentUser) {
      return {
        success: false,
        msg: 'User was not found to join room',
      };
    }
    return {
      success: true,
      user: { userID: currentUser._id, username: currentUser.username },
      previousRoom: currentUser.room,
    };
  } catch (error) {
    console.error(error.message);
    return { success: false, msg: error.message };
  }
};

module.exports = {
  userJoinRoom,
};
