import axios from "axios";
const URL = "http://localhost:5000";

const addFigureAPI = async (figure) => {
  await axios.post(`${URL}/addFigure`, figure);
};

const updateFigure = async (figure) => {
  await axios.patch(`${URL}/updateFigure`, figure);
};

const getFigures = async (roomname, username) => {
  return await axios.get(`${URL}/getFigures`, {
    params: {
      roomname,
      username,
    },
  });
};

const clearCanvas = async (roomname) => {
  console.log(roomname);
  await axios.patch(`${URL}/clearCanvas`, { roomname });
};

const changeLineColor = async (lineColor, roomname, username) => {
  await axios.patch(`${URL}/changeLineColor`, {
    lineColor,
    roomname,
    username,
  });
};

const changeLineWidth = async (lineWidth, roomname, username) => {
  await axios.patch(`${URL}/changeLineWidth`, {
    lineWidth,
    roomname,
    username,
  });
};

const changeShape = async (shape, roomname, username) => {
  await axios.patch(`${URL}/changeShape`, { shape, roomname, username });
};
export {
  addFigureAPI,
  updateFigure,
  getFigures,
  clearCanvas,
  changeLineColor,
  changeLineWidth,
  changeShape,
};
