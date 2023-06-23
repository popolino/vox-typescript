import React, { useEffect } from "react";
import "./assets/scss/global.scss";
import "./assets/scss/reset.scss";
import "../src/assets/overriders.scss";
import Router from "./routes/Router";
import { useBoundActions } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { initializeAppThunk } from "./AppSlice";
import SvgSelector from "./components/svgSelector/SvgSelector";

const allActions = {
  initializeAppThunk,
};

const App: React.FC = () => {
  const boundActions = useBoundActions(allActions);

  const initialized = useAppSelector((state) => state.appReducer.initialized);

  useEffect(() => {
    boundActions.initializeAppThunk();
  }, []);
  if (!initialized)
    return (
      <div className="main-svg">
        <SvgSelector id="main_preloader" />
      </div>
    );
  return <Router />;
};

export default App;
