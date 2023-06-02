import classes from "../Auth.module.scss";
import TextField from "@mui/material/TextField";
import React from "react";
import { Field, reduxForm } from "redux-form";
import { FormsControls } from "../../../components/FormsControls/FormsControls";
import {
  minLengthCreator,
  required,
} from "../../../utils/validators/validators";

const minLength6 = minLengthCreator(6);
const LoginForm = (props: any) => {
  return (
    <form className={classes.form}>
      <div>
        <Field
          name={"email"}
          component={FormsControls}
          children={<TextField label="email" variant="standard" />}
          validate={[required, minLength6]}
        />
        <Field
          type="password"
          placeholder={"Password"}
          name={"password"}
          component={FormsControls}
          children={
            <TextField label="Password" variant="standard" type="password" />
          }
          validate={[required, minLength6]}
        />
        <Field
          type="checkbox"
          name={"rememberMe"}
          component={FormsControls}
          children={
            <>
              <input type="checkbox" />
              <label>Remember me</label>
            </>
          }
        />
        {/*{props.captchaUrl && <img src={props.captchaUrl} alt="" />}*/}
        {/*{props.captchaUrl && (*/}
        {/*  <Field*/}
        {/*    name={"symbols from image"}*/}
        {/*    component={FormsControls}*/}
        {/*    children={<TextField label="email" variant="standard" />}*/}
        {/*    validate={[required]}*/}
        {/*  />*/}
        {/*)}*/}
      </div>
      {props.error && <div className="form-summary-error">{props.error}</div>}{" "}
      <button className={classes.button}>Sign in</button>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

export default LoginReduxForm;
