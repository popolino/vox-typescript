import React from "react";
import classes from "../SidebarFriends.module.scss";
import Tooltip from "@mui/material/Tooltip";
import avatar from "../../../assets/img/user.png";
import { NavLink, useNavigate } from "react-router-dom";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { useBoundActions } from "../../../app/store";
import { profileActions } from "../../profile/ProfileSlice";

type TSidebarProps = {
  id: number;
  username: string;
  photo: string;
};

const allActions = {
  ...profileActions,
};
const SidebarFriend: React.FC<TSidebarProps> = ({ id, username, photo }) => {
  const navigate = useNavigate();
  const boundActions = useBoundActions(allActions);
  const onNavigateToMessenger = (
    id: number | undefined,
    username: string | undefined,
    photo: string | undefined
  ) => {
    boundActions.setSelectUser({ id: id, username: username, photo: photo });
    navigate(`/messenger/dialog/${id}`);
  };
  return (
    <div>
      <div className={`${classes.user} user`}>
        <div className={`${classes.avatar} sidebar__profile_photo`}>
          <img src={photo ? photo : avatar} alt="" />
        </div>
        <div className="about-user">
          <NavLink to={`/profile/${id}`}>
            <div className="username">{username}</div>
          </NavLink>
          <div className="unique-name">{`@user${id}`}</div>
        </div>
        <div className={classes.tooltip}>
          <Tooltip
            onClick={() => onNavigateToMessenger(id, username, photo)}
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
    </div>
  );
};

export default SidebarFriend;
