import classes from "./Auth.module.scss";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import welcomeImage from "../../assets/img/welcome.png";
import { useAppSelector } from "../../app/hooks";
import { useBoundActions } from "../../app/store";
import { authActions, fetchAuth, fetchCaptcha, fetchLogin } from "./AuthSlice";
import Login from "./login/Login";
import Registration from "./registration/Registration";

const allActions = {
  fetchAuth,
  fetchLogin,
  fetchCaptcha,

  ...authActions,
};

const Auth: React.FC = () => {
  const boundActions = useBoundActions(allActions);

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
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
