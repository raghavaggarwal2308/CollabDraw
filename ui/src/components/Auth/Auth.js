import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  const verify = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedJwt = parseJwt(token);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  };
  useEffect(() => {
    verify();
    props.history.listen(() => {
      verify();
    });
    // eslint-disable-next-line
  }, []);

  return <div></div>;
};

export default withRouter(AuthVerify);
