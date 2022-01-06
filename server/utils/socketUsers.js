// let users = [];
const Room = require("../models/Room.js");
const addUser = async ({ username, roomname, id }) => {
  if (username === "" || roomname === "") {
    return { error: "Invalid UserName or RoomName" };
  }
  const room = await Room.findOne({ roomname });
  if (room) {
    const users = room.users;
    const user = users.find((user) => user.username === username);
    if (user) {
      return { error: `${username} already exists in ${roomname}` };
    }
    //users.push({ username, roomname, id });
  }
  return { message: "User added succesfully" };
};

const ObjectId = require("mongoose").Types.ObjectId;
function isValidObjectId(id) {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
}

const removeUser = async (username, roomname) => {
  const room = await Room.findOne({ roomname });
  room.users = room.users.filter((user) => user.username !== username);
  if (room.users.length === 0 && !isValidObjectId(roomname)) {
    await Room.deleteOne({ roomname });
  } else await room.save();
  return { message: "user removed successfully" };
};

module.exports = {
  addUser,
  removeUser,
};
