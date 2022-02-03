import React from "react";
import { Link, Redirect } from "react-router-dom";
// import { withRouter } from "react-router";
import Logo from "../Logo/Logo";
import "./Home.css";
import image from "../../assets/homeimg.svg";
import Navbar from "../Navbar/Navbar";
import temp from "../../assets/temp.png";
import collab from "../../assets/collaboration.png";
import diagram from "../../assets/diagram.png";
import single from "../../assets/single.png";
function Home({ isAuthenticated, logOut }) {
  return (
    <>
      {isAuthenticated === "false" || isAuthenticated === null ? (
        <>
          <Navbar isAuthenticated={isAuthenticated} logOut={logOut} />
          <div className="home-wrapper">
            <div className="home">
              <div className="homeLeft">
                <h1>Collab Draw</h1>
                <p>
                  It can be used to store, manage and organize your drawings
                  within the app. You can access your drawings anytime and from
                  anywhere
                </p>
                <button className="signupButton">
                  <Link to="/signup">Signup</Link>
                </button>
                <button className="exploreButton">
                  <a href="#features">Explore</a>
                </button>
              </div>
              <div className="homeRight">
                <img src={image} alt="" />
              </div>
            </div>
            <div className="features" id="features">
              <div className="feature-heading">Features</div>
              <div className="feature-left">
                <div className="feature-description">
                  <h1>Collaboration</h1>
                  <p>
                    No more requirement of sharing screens. Collaborate with
                    your team-mates in a single workspace.
                  </p>
                </div>
                <div className="feature-image">
                  <img src={collab} alt="" />
                </div>
              </div>
              <div className="feature-right">
                <div className="feature-image">
                  <img src={diagram} alt="" />
                </div>
                <div className="feature-description">
                  <h1>Common Use Cases</h1>
                  <p>Brainstroming</p>
                  <p>Diagrams</p> <p>Wireframing</p> <p> Meetings</p>
                </div>
              </div>
              <div className="feature-left">
                <div className="feature-description">
                  <h1>Single Plank</h1>
                  <p>
                    A personal plank where you can conceive your ideas without
                    any impede
                  </p>
                </div>
                <div className="feature-image">
                  <img
                    src={single}
                    style={{ border: "1px solid rgb(240, 236, 236)" }}
                    alt=""
                  />
                </div>
              </div>
              {/* <div className="feature-right">
                <div className="feature-image">
                  <img src={temp} alt="" />
                </div>
                <div className="feature-description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </div>
              </div> */}
            </div>
            <div className="try">
              <div className="try-icon">
                {/* <BorderColorIcon /> */}
                <Logo />
              </div>
              <div className="try-description">Try out Collab Draw</div>
              <Link to="/signup" className="try-button">
                Sign Up
              </Link>
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
        </>
      ) : (
        <Redirect to="/join" />
      )}
    </>
  );
}

export default Home;
