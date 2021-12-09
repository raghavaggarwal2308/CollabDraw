import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

function Home() {
  return (
    <div>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </nav>
    </div>
  );
}

export default withRouter(Home);
