import axios from "axios";
const URL = "http://localhost:5000";
export const addUser = async (user) => {
  console.log(user);
  return await axios.post(`${URL}/add`, user);
};
export const loginUser = async (user) => {
  return await axios.post(`${URL}/login`, user);
};
