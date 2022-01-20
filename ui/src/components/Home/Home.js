import React from "react";
import { Link, Redirect } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
// import { withRouter } from "react-router";
import "./Home.css";
import image from "../../assets/homeimg.svg";
function Home() {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return (
    <>
      {isAuthenticated === "false" || isAuthenticated === null ? (
        <div className="home-wrapper">
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
          <div className="features">
            <div className="feature-heading">Features</div>
            <div className="feature-left">
              <div className="feature-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </div>
              <div className="feature-image">
                <img src={image} alt="" />
              </div>
            </div>
            <div className="feature-right">
              <div className="feature-image">
                <img src={image} alt="" />
              </div>
              <div className="feature-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </div>
            </div>
            <div className="feature-left">
              <div className="feature-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </div>
              <div className="feature-image">
                <img src={image} alt="" />
              </div>
            </div>
            <div className="feature-right">
              <div className="feature-image">
                <img src={image} alt="" />
              </div>
              <div className="feature-description">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </div>
            </div>
          </div>
          <div className="try">
            <div className="try-icon">
              <BorderColorIcon />
            </div>
            <div className="try-description">Try out Collab Draw</div>
            <div className="try-button">Sign Up</div>
          </div>
          <div className="footer">
            <p>
              Made with ❤️ by &nbsp;
              <a href="https://github.com/Charu271">Charu Sachdeva</a> &nbsp;
              and &nbsp;
              <a href="https://github.com/raghavaggarwal2308">
                Raghav Aggarwal
              </a>
            </p>
          </div>
        </div>
      ) : (
        <Redirect to="/join" />
      )}
    </>
  );
}

export default Home;
