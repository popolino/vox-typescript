import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NotFoundPage.module.scss";

const NotFoundPage: React.FC = () => {
  return (
    <div className={classes.container}>
      <h1>404</h1>
      <p>Page not found</p>
      <NavLink to={"/profile"}>
        <button className="button-blue">Back</button>
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
