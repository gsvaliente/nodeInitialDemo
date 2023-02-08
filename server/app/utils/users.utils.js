const User = require('../models/user.model');

const userJoinRoom = async (user, room) => {
  try {
    const currentUser = await User.findOneAndUpdate(
      { _id: user.userID },
      { online: true, 'room.roomID': room.roomID, 'room.name': room.name }
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

const getAllUsers = async () => {
  try {
    const userList = await User.find({ online: true });
    const mappedList = userList.map(({ _id, username }) => {
      return { _id, username };
    });
    return { success: true, mappedList };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userJoinRoom,
  getAllUsers,
};
