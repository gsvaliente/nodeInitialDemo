const User = require('../models/user.model');

const userJoinRoom = async (user, room) => {
  // let responseToSend;
  // try {
  //   const currentUser = await User.findByIdAndUpdate(
  //     { _id: user.userID },
  //     { 'room.roomID': room.roomID, 'room.name': room.name }
  //   );
  //   if (!currentUser) {
  //     responseToSend = {
  //       success: false,
  //       msg: 'User was not found to join room',
  //     };
  //   }
  //   responseToSend = {
  //     success: true,
  //     user: { userID: currentUser._id, username: currentUser.username },
  //     previousRoom: currentUser.room,
  //   };
  // } catch (error) {
  //   console.error(error.message);
  //   return { success: false, msg: error.message };
  // }
  // return responseToSend;
  let result;
  try {
    // Push user into the current room
    const currentUser = await User.findOneAndUpdate(
      { _id: user.userId },
      { 'room.roomId': room.roomId, 'room.roomName': room.roomName }
    );

    if (currentUser) {
      result = {
        status: 'success',
        user: { userId: currentUser._id, userName: currentUser.userName },
        oldRoom: currentUser.room,
      };
    } else {
      result = { status: 'fail', message: 'Error joining room' };
    }
  } catch (err) {
    result = { status: 'error', message: err.message };
  }

  return result;
};

module.exports = {
  userJoinRoom,
};
