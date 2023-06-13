import React from "react";
import classes from "./RightSidebar.module.scss";
import avatar from "../../../../img/avatar.jpg";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";
import { THeaderProps } from "../Header";

const RightSidebar: React.FC<THeaderProps> = ({ authUser }) => {
  console.log(authUser);
  return (
    <div className={classes["right-sidebar"]}>
      <div className={classes.notifications}>
        <div className={classes.svg}>
          <SvgSelector id="comment" className={classes["header-svg"]} />
        </div>
        <div className={classes.svg}>
          <SvgSelector id="bell" className={classes["header-svg"]} />
        </div>
      </div>
      <div className={classes.user}>
        <div className="sidebar__profile_photo">
          <img
            src={authUser && authUser.photos ? authUser?.photos.small : avatar}
            alt=""
          />
        </div>
        <div className={classes.arrow}>❱</div>
      </div>
    </div>
  );
};

export default RightSidebar;
