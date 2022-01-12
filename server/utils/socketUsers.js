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

const removeUser = async (username, roomname) => {
  try {
    const room = await Room.findOne({ roomname });
    if (room.singleroom) {
    } else {
      room.users = room.users.filter((user) => user.username !== username);
      if (room.users.length === 0) {
        // if (room.singleroom) await room.save();
        // else
        await Room.deleteOne({ roomname });
      } else {
        await room.save();
      }
    }
    return { message: "user removed successfully" };
  } catch (e) {
    console.log(e.message);
    return { message: e.message };
  }
};

module.exports = {
  addUser,
  removeUser,
};
