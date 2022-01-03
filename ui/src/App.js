import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import { Switch, Route } from "react-router-dom";
import io from "socket.io-client";
import Join from "./components/Join/Join";
import Container from "./components/Container/Container";

function App() {
  // let socket;
  // socket = io.connect("http://localhost:5000", {
  //   transports: ["websocket"],
  // });
  const socket = io("http://localhost:5000", {
    transports: ["websocket", "polling"],
  });
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/join">
          <Join socket={socket} />
        </Route>
        <Route path="/board/:username/:roomname">
          <Container socket={socket} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
