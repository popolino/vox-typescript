import React from "react";
import classes from "../Auth.module.scss";
import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";

const Registration: React.FC = () => {
  return (
    <>
      <div className={classes.title}>
        <h1>Create account</h1>
      </div>
      <div className={classes.body}>
        <TextField label="Username" variant="standard" className="input" />
        <TextField label="Password" variant="standard" className="input" />
        <TextField
          label="Confirm password"
          variant="standard"
          className="input"
        />
        <button className={classes.button}>Sign up</button>
        <p className={classes.separator}>or</p>
        <NavLink to="/auth/login" className={classes.link}>
          sign in
        </NavLink>
      </div>
    </>
  );
};

export default Registration;
