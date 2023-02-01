let users = [];

const userJoin = (id, username, room) => {
  const user = {
    id,
    username,
    room,
  };
  users.push(user);
  return user;
};

const getCurrentUser = (id) => {
  return users.find((user) => user.id === id);
};

const userLeaves = (id) => {
  const user = getCurrentUser(id);
  users = users.filter((user) => user.id !== id);
  return user;
};

const getRoomUsers = (room) => {
  let usersInRoom = users.filter((user) => user.room === room);
  return usersInRoom;
};

module.exports = {
  userJoin,
  getCurrentUser,
  userLeaves,
  getRoomUsers,
};
