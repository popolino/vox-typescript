import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import DialogWindow from "./DialogWindow";
import { useAppSelector } from "../../app/hooks";
import { useBoundActions } from "../../app/store";
import { profileActions } from "../profile/ProfileSlice";
import DialogsUsers from "./dialogs-users/DialogsUsers";

const allActions = {
  ...profileActions,
};

const Messenger: React.FC = () => {
  const boundActions = useBoundActions(allActions);

  const selectUserDialog = useAppSelector(
    (state) => state.profileReducer.selectUserDialog
  );
  const [width, setWidth] = useState(window.innerWidth);

  const isWideScreen = width >= 480;
  const setSelectUserDialog = (
    id: number | undefined,
    username: string | undefined,
    photo: string | undefined
  ) => {
    boundActions.setSelectUser({ id: id, username: username, photo: photo });
  };
  const onCleanSelectUser = () => {
    boundActions.setSelectUser(null);
  };
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="messenger-chat-container">
      {!isWideScreen && (
        <Routes>
          <Route
            path="/*"
            element={
              <DialogsUsers
                setSelectUserDialog={setSelectUserDialog}
                selectUserDialog={selectUserDialog}
              />
            }
          />

          {selectUserDialog && (
            <Route
              path={`/dialog/${selectUserDialog.id}`}
              element={
                <DialogWindow
                  selectUserDialog={selectUserDialog}
                  onCleanSelectUser={onCleanSelectUser}
                />
              }
            />
          )}
        </Routes>
      )}
      {isWideScreen && (
        <>
          <DialogsUsers
            setSelectUserDialog={setSelectUserDialog}
            selectUserDialog={selectUserDialog}
          />
          <DialogWindow
            selectUserDialog={selectUserDialog}
            onCleanSelectUser={onCleanSelectUser}
          />
        </>
      )}
    </div>
  );
};

export default Messenger;
