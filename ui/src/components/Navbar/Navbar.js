import React from "react";

function Navbar({ logOut, isAuthenticated }) {
  return (
    <>
      {isAuthenticated === "true" ? (
        <div onClick={logOut}>Logout</div>
      ) : (
        <>
          <div>Login</div>
          <div>Signup</div>
        </>
      )}
    </>
  );
}

export default Navbar;
