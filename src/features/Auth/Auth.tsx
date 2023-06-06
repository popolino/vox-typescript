import classes from "./Auth.module.scss";
import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Registration from "./Registration/Registration";
import welcomeImage from "../../img/welcome.png";
import { useAppSelector } from "../../app/hooks";
import { useBoundActions } from "../../app/store";
import { useSnackbar } from "notistack";
import { fetchUserProfile, profileActions } from "../profile/ProfileSlice";
import { authActions, fetchAuth, fetchLogin } from "./AuthSlice";
import Login from "./Registration/Login";

const allActions = {
  fetchAuth,
  fetchLogin,

  ...authActions,
};

const Auth = () => {
  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const authData = useAppSelector((state) => state.authReducer.authData);

  const handleFetchLogin = (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    boundActions.fetchLogin({
      email: email,
      password: password,
      rememberMe: rememberMe,
    });
  };
  useEffect(() => console.log(isAuth), [isAuth]);
  console.log(isAuth);
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
                  <Login isAuth={isAuth} handleFetchLogin={handleFetchLogin} />
                }
              />
              <Route
                path="/"
                element={
                  <Login isAuth={isAuth} handleFetchLogin={handleFetchLogin} />
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
