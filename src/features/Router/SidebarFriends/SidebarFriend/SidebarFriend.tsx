import React from "react";
import classes from "../SidebarFriends.module.scss";
import Tooltip from "@mui/material/Tooltip";
import avatar from "../../../../img/avatar.jpg";
import { NavLink } from "react-router-dom";
import { TPhotos } from "../../../users/Users.types";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";

type TSidebarProps = {
  id: number;
  username: string;
  photo: string;
  setCurrentId: (id: number) => void;
};

const SidebarFriend: React.FC<TSidebarProps> = ({
  id,
  username,
  photo,
  setCurrentId,
}) => {
  return (
    <NavLink to={`/profile/${id}`} onClick={() => setCurrentId(id)}>
      <div className={`${classes.user} user`}>
        <div className={`${classes.avatar} sidebar__profile_photo`}>
          <img src={photo ? photo : avatar} alt="" />
        </div>
        <div className="about-user">
          <div className="username">{username}</div>
          <div className="unique-name">{`@user${id}`}</div>
        </div>
        <div className={classes.tooltip}>
          <Tooltip
            title="Add message"
            placement="left"
            classes={{ tooltip: "tooltip" }}
          >
            <button className={classes.comment}>
              <SvgSelector id="comment" />
            </button>
          </Tooltip>
        </div>
      </div>
    </NavLink>
  );
};

export default SidebarFriend;
