const User = require("../models/User.js");
const addUser = async (request, response) => {
  const currentUser = request.body;
  try {
    const newUser = new User(currentUser);
    const token = await newUser.getAuthToken();
    response.status(200).send({ user: newUser, token });
  } catch (error) {
    response.json({ message: error.message });
  }
};
const loginUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const currentUser = await User.findUser(email, password);
    const token = await currentUser.getAuthToken();
    response.send({ user: currentUser, token });
  } catch (e) {
    response.status(400).send({ message: e.message });
  }
};
module.exports = { addUser, loginUser };
