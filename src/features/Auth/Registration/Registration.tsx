import React from "react";
import classes from "../Auth.module.scss";
import { NavLink } from "react-router-dom";
import { TextField } from "@mui/material";

const Registration = () => {
  return (
    <>
      <div className={classes.title}>
        <h1>Create account</h1>
      </div>
      <div className={classes.body}>
        <TextField label="Username" variant="standard" />
        <TextField label="Password" variant="standard" />
        <TextField label="Confirm password" variant="standard" />
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
