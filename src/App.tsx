import React, { useEffect } from "react";
import "./App.scss";
import Profile from "./features/profile/Profile";
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import "./App.scss";
import "./reset.css";
import "../src/assets/overriders.scss";
import Router from "./features/Router/Router";
import Auth from "./features/Auth/Auth";
import { useBoundActions } from "./app/store";
import { fetchAuth, fetchLogout } from "./features/Auth/AuthSlice";
import { useAppSelector } from "./app/hooks";
import { appActions, initializeAppThunk } from "./AppSlice";
import { fetchFriends } from "./features/users/usersSlice";
import { profileActions } from "./features/profile/ProfileSlice";

const allActions = {
  fetchAuth,
  fetchFriends,
  fetchLogout,
  initializeAppThunk,
  ...appActions,
  ...profileActions,
};

function App() {
  const boundActions = useBoundActions(allActions);

  const initialized = useAppSelector((state) => state.appReducer.initialized);
  const friends = useAppSelector((state) => state.usersReducer.friends);

  const setCurrentId = (id: number) => {
    boundActions.setCurrentUserId(id);
  };
  const onLogout = () => {
    boundActions.fetchLogout();
  };
  useEffect(() => {
    boundActions.initializeAppThunk();
  }, []);
  if (!initialized) return <div>error</div>;
  return (
    <HashRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route
          path="/*"
          element={
            <Router
              friends={friends}
              setCurrentId={setCurrentId}
              onLogout={onLogout}
            />
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
