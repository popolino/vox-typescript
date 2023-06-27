import classes from "./Messenger.module.scss";
import clsx from "clsx";
import avatar from "../../assets/img/user.png";
import { NavLink, useNavigate } from "react-router-dom";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import React from "react";
import { IconButton, TextareaAutosize } from "@mui/material";

type TDialogWindow = {
  selectUserDialog: {
    id: number | undefined;
    username: string | undefined;
    photo: string | undefined;
  } | null;
  onCleanSelectUser: () => void;
};

const DialogWindow: React.FC<TDialogWindow> = ({
  selectUserDialog,
  onCleanSelectUser,
}) => {
  let navigate = useNavigate();
  const handleKeyDown = () => {
    navigate("/messenger");
    onCleanSelectUser();
  };
  return (
    <>
      <div className={classes["dialog-container"]}>
        {selectUserDialog && (
          <>
            {selectUserDialog && (
              <div className={clsx("user", classes["select-user"])}>
                <div>
                  <IconButton className={classes.arrow} onClick={handleKeyDown}>
                    <SvgSelector id="arrow" />
                  </IconButton>
                  <div className={`${classes.avatar} sidebar__profile_photo`}>
                    <img
                      src={
                        selectUserDialog.photo ? selectUserDialog.photo : avatar
                      }
                      alt="#"
                    />
                  </div>
                  <div className="about-user">
                    <NavLink to={`/profile/${selectUserDialog.id}`}>
                      <p className="username">{selectUserDialog.username}</p>
                    </NavLink>
                    <p className="unique-name">{`@user${selectUserDialog.id}`}</p>
                  </div>
                </div>
                <SvgSelector id="more" />
              </div>
            )}
            <div className="text-field-container">
              <div>
                <IconButton>
                  <SvgSelector id="clip" />
                </IconButton>
                <TextareaAutosize placeholder="Message" maxRows="3" />
              </div>
              <div>
                <IconButton>
                  <SvgSelector id="send" />
                </IconButton>
                <IconButton>
                  <SvgSelector id="image" />
                </IconButton>
              </div>
            </div>
          </>
        )}
        {!selectUserDialog && (
          <div className={classes.empty}>Select a user to see the dialog</div>
        )}
      </div>
    </>
  );
};
export default DialogWindow;
