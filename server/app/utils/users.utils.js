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
        msg: 'User was not found',
      };
    }
    // console.log(currentUser.room);
    return {
      success: true,
      user: { userID: currentUser._id, username: currentUser.username },
      previousRoom: currentUser.room,
    };
  } catch (error) {
    console.error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    let users = await User.find({ online: true });

    return { success: true, users };
  } catch (error) {
    console.error(error.message);
  }
};

const disconnectUser = async (user) => {
  try {
    let userDisconnected = await User.findOneAndUpdate(
      { _id: user.userID },
      { online: false, 'room.roomID': null, 'room.name': null }
    );

    if (userDisconnected) {
      // console.log(userDisconnected, user);
      return { success: true, user, room: userDisconnected.room };
    } else {
      return {
        success: false,
        msg: 'user not found',
      };
    }
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  userJoinRoom,
  getAllUsers,
  disconnectUser,
};
