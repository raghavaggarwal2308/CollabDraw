let users = [];
const addUser = ({ username, roomname, id }) => {
  if (username === "" || roomname === "") {
    return { error: "Invalid UserName or RoomName" };
  }
  const user = users.find(
    (user) => user.username === username && user.roomname === roomname
  );
  if (user) {
    return { error: `${username} already exists in ${roomname}` };
  }
  users.push({ username, roomname, id });
  return { message: "User added succesfully" };
};

const removeUser = (id) => {
  users = users.filter((user) => user.id !== id);
  return { message: "user removed successfully" };
};

module.exports = {
  addUser,
  removeUser,
};
