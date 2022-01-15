import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Switch, Route, useHistory } from "react-router-dom";
import io from "socket.io-client";
import Join from "./components/Join/Join";
import Container from "./components/Container/Container";
import P404 from "./components/404/404";
import Auth from "./components/Auth/Auth";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";

function App() {
  const [isAuthenticated, setisAuthenticated] = useState(
    localStorage.getItem("isAuthenticated")
  );
  const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"],
  });
  const history = useHistory();
  const logOut = () => {
    localStorage.setItem("isAuthenticated", false);
    setisAuthenticated("false");
    history.push("/login");
  };

  return (
    <div className="App">
      <Navbar logOut={logOut} isAuthenticated={isAuthenticated} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login setisAuthenticated={setisAuthenticated} />
        </Route>
        <Route path="/signup">
          <SignUp setisAuthenticated={setisAuthenticated} />
        </Route>
        <Route path="/join">
          <Join socket={socket} />
        </Route>
        <Route path="/board/:username/:roomname">
          <Container socket={socket} />
        </Route>
        <Route path="/*">
          <P404 />
        </Route>
      </Switch>
      <Auth logOut={logOut} />
    </div>
  );
}

export default App;
