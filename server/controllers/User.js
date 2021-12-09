const User = require("../models/User.js");
const addUser = async (request, response) => {
  const currentUser = request.body;
  console.log(request.body);
  //console.log(currentUser);
  try {
    const newUser = new User(currentUser);
    await newUser.save();
    response.status(200).send(newUser);
  } catch (error) {
    response.json({ message: error.message });
  }
};
module.exports = { addUser };
