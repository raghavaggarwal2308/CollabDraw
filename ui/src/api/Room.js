import axios from "axios";
const URL = "http://localhost:5000";

const addFigureAPI = async (figure) => {
  await axios.post(`${URL}/addFigure`, figure);
};

const updateFigure = async (figure) => {
  await axios.patch(`${URL}/updateFigure`, figure);
};

const getFigures = async (roomname) => {
  return await axios.get(`${URL}/getFigures`, {
    params: {
      roomname,
    },
  });
};
export { addFigureAPI, updateFigure, getFigures };
