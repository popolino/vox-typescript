import React from "react";
import classes from "../Messenger.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { NavLink } from "react-router-dom";
import DialogUser from "./DialogUser";
import { useAppSelector } from "../../../app/hooks";

type TDialogsUsersProps = {
  selectUserDialog: {
    id: number | undefined;
    username: string | undefined;
    photo: string | undefined;
  } | null;
  setSelectUserDialog: (
    id: number | undefined,
    username: string | undefined,
    photo: string | undefined
  ) => void;
};

const DialogsUsers: React.FC<TDialogsUsersProps> = ({
  setSelectUserDialog,
  selectUserDialog,
}) => {
  const friends = useAppSelector((state) => state.usersReducer.friends);
  return (
    <div className={classes["left-container"]}>
      <div className={classes.search}>
        <SvgSelector id="burger" />
        <div className={classes["dialog-search"]}>
          <SvgSelector id="search" />
          <input className="search-input" placeholder="Search" type="text" />
        </div>
      </div>
      {friends.map((friend) => (
        <NavLink to={`/messenger/dialog/${friend.id}`} key={friend.id}>
          <DialogUser
            setSelectUserDialog={setSelectUserDialog}
            selectUserDialog={selectUserDialog}
            id={friend.id}
            username={friend.name}
            photo={friend.photos.small}
          />
        </NavLink>
      ))}
    </div>
  );
};

export default DialogsUsers;
