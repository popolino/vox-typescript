import React from "react";
import classes from "./LeftSidebar.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";

const LeftSidebar: React.FC = () => {
  return (
    <div className={classes["left-sidebar"]}>
      <SvgSelector id="logo" />
      <div className={classes.vox}>VOX</div>
    </div>
  );
};

export default LeftSidebar;
