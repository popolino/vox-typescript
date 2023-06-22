import React from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import { routes } from "./routes";
import PrivateLayout from "../layouts/PrivateLayout";
import Auth from "../features/auth/Auth";
import PublicLayout from "../layouts/PublicLayout";

const Router: React.FC = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            {routes
              .filter((route) => route.public)
              .map((route, i) => (
                <Route
                  key={i}
                  path={
                    "/" + route.path + (route.param ? `/:${route.param}` : "")
                  }
                  element={route.component}
                />
              ))}
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/messenger/test" element={<div>sfs</div>} />
          </Route>
          <Route element={<PrivateLayout />}>
            {routes
              .filter((route) => !route.public)
              .map((route, i) => (
                <Route
                  key={i}
                  path={
                    "/" + route.path + (route.param ? `/:${route.param}` : "")
                  }
                  element={route.component}
                />
              ))}
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};

export default Router;
