import React from "react";
import classes from "../Auth.module.scss";
import { Navigate } from "react-router";
import LoginReduxForm from "./LoginForm";

const Login = (props: any) => {
  type TFormData = {
    email: string;
    password: string;
    rememberMe: boolean;
  };

  const onSubmit = (formData: any) => {
    // props.loginThunk(
    //   formData.email,
    //   formData.password,
    //   formData.rememberMe
    //   // formData.captchaUrl
    // );
  };
  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <>
      <div className={classes.title}>
        <h1>Welcome back</h1>
      </div>
      <div className={classes.body}>
        <div className={classes.phrase}>
          <h2>Please enter your details</h2>
          <a href="#">Forget password?</a>
        </div>
        <p className={classes.separator}>or</p>
      </div>
    </>
  );
};

// const mapStateToProps = (state) => {
//   const { authReducer } = state;
//   return {
//     // isAuth: authReducer.isAuth,
//     // captchaUrl: authReducer.captchaUrl,
//   };
// };

export default Login;
