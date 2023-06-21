import classes from "./Messenger.module.scss";
import clsx from "clsx";
import avatar from "../../img/user.png";
import { NavLink } from "react-router-dom";
import SvgSelector from "../../components/svgSelector/SvgSelector";
import React from "react";

type TDialogWindow = {
  selectUser: { id: number; username: string; photo: string } | null;
};

const DialogWindow: React.FC<TDialogWindow> = ({ selectUser }) => {
  return (
    <div className={classes["dialog-container"]}>
      {selectUser && (
        <div className={clsx("user", classes["select-user"])}>
          <div>
            <div className={`${classes.avatar} sidebar__profile_photo`}>
              <img src={selectUser.photo ? selectUser.photo : avatar} alt="#" />
            </div>
            <div className="about-user">
              <NavLink to="/profile">
                <p className="username">{selectUser.username}</p>
              </NavLink>
              <p className="unique-name">{`@user${selectUser.id}`}</p>
            </div>
          </div>
          <SvgSelector id="more" />
        </div>
      )}
      <div>
        <div className={classes.dialog}></div>
        <div className={classes["text-field-container"]}>
          <div>
            <SvgSelector id="clip" />
            <textarea name="" id="" placeholder="Message"></textarea>
          </div>
          <SvgSelector id="image" />
        </div>
      </div>
    </div>
  );
};
export default DialogWindow;
