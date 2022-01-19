import React from "react";
import { Link, Redirect } from "react-router-dom";
// import { withRouter } from "react-router";
import "./Home.css";
import image from "../../assets/homeimg.svg";
function Home() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <>
      {isAuthenticated === "false" || isAuthenticated === null ? (
        <div>
          <div className="home">
            <div className="homeLeft">
              <h1>Collab Draw</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing L
              </p>
            </div>
            <div className="homeRight">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <Redirect to="/join" />
      )}
    </>
  );
}

export default Home;
