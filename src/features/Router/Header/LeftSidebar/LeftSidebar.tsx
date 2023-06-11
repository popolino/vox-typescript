import React from "react";
import classes from "./LeftSidebar.module.scss";

const LeftSidebar = () => {
  return (
    <div className={classes["left-sidebar"]}>
      <div className={classes.logo} />
      <div className={classes.vox}>VOX</div>
    </div>
  );
};

export default LeftSidebar;
