import React, { useEffect } from "react";
import "./assets/scss/global.scss";
import "./assets/scss/reset.scss";
import "./assets/overriders.scss";
import Router from "./routes/Router";
import { useBoundActions } from "./app/store";
import { useAppSelector } from "./app/hooks";
import { initializeAppThunk } from "./AppSlice";
import SvgSelector from "./components/svgSelector/SvgSelector";
import { fetchFoundUser, fetchUsers } from "./features/users/usersSlice";

const allActions = {
  initializeAppThunk,
  fetchUsers,
  fetchFoundUser,
};

const App: React.FC = () => {
  const boundActions = useBoundActions(allActions);

  const initialized = useAppSelector((state) => state.appReducer.initialized);
  const headerTitle = useAppSelector((state) => state.usersReducer.headerTitle);

  useEffect(() => {
    boundActions.initializeAppThunk();
    boundActions.fetchUsers({ currentPage: 1, pageCount: 10 });
  }, [headerTitle]);
  if (!initialized)
    return (
      <div className="main-svg">
        <SvgSelector id="main_preloader" />
      </div>
    );
  return <Router />;
};

export default App;
