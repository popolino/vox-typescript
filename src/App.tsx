import React, { useEffect } from "react";
import "./App.scss";
import Profile from "./features/profile/Profile";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.scss";
import "./reset.css";
import Router from "./features/Router/Router";
import Auth from "./features/Auth/Auth";
import { useBoundActions } from "./app/store";
import { fetchAuth, fetchLogout } from "./features/Auth/AuthSlice";
import { useAppSelector } from "./app/hooks";

const allActions = {
  fetchAuth,
};

function App() {
  const boundActions = useBoundActions(allActions);

  useEffect(() => {
    boundActions.fetchAuth();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/*" element={<Router />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
