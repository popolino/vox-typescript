import React from "react";
import classes from "./RightSidebar.module.scss";
import avatar from "../../../../img/avatar.jpg";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";
import { THeaderProps } from "../Header";
import { IconButton } from "@mui/material";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
import { TOption } from "../../../../components/CustomSelect/CustomSelect.types";

type TRightSidebarProps = {
  onLogout: () => void;
};

const categoryOptions: TOption[] = [
  { value: "support", label: "Support", id: "support" },
  { value: "logout", label: "Logout", id: "logout" },
];
const RightSidebar: React.FC<TRightSidebarProps> = ({ onLogout }) => {
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
      <CustomSelect onClick={onLogout} options={categoryOptions} />
    </div>
  );
};

export default RightSidebar;
