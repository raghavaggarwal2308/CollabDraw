import React from "react";
import { Link } from "react-router-dom";

function Navbar({ logOut, isAuthenticated }) {
  return (
    <>
      {isAuthenticated === "true" ? (
        <div onClick={logOut}>Logout</div>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </>
  );
}

export default Navbar;
