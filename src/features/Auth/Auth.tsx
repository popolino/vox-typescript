import classes from "./Auth.module.scss";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Registration from "./Registration/Registration";
import welcomeImage from "../../img/welcome.png";
import { useAppSelector } from "../../app/hooks";
import { useBoundActions } from "../../app/store";
import { useSnackbar } from "notistack";
import { fetchUserProfile, profileActions } from "../profile/ProfileSlice";
import { authActions, fetchAuth, fetchCaptcha, fetchLogin } from "./AuthSlice";
import Login from "./Login/Login";

const allActions = {
  fetchAuth,
  fetchLogin,
  fetchCaptcha,

  ...authActions,
};

const Auth = () => {
  const boundActions = useBoundActions(allActions);

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const authData = useAppSelector((state) => state.authReducer.authData);
  const captchaURL = useAppSelector((state) => state.authReducer.captchaURL);

  const handleFetchLogin = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string | null
  ) => {
    boundActions.fetchLogin({
      email: email,
      password: password,
      rememberMe: rememberMe,
      captcha: captcha,
    });
  };

  if (isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div className={classes.auth}>
      <div className={classes.container}>
        <div className={classes["picture-container"]}>
          <img src={welcomeImage} alt="" />
        </div>
        <div className={classes.wrapper}>
          <div className={classes.form}>
            <Routes>
              <Route
                path="/login"
                element={
                  <Login
                    isAuth={isAuth}
                    captchaURL={captchaURL}
                    handleFetchLogin={handleFetchLogin}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <Login
                    isAuth={isAuth}
                    handleFetchLogin={handleFetchLogin}
                    captchaURL={captchaURL}
                  />
                }
              />
              <Route path="/registration" element={<Registration />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
