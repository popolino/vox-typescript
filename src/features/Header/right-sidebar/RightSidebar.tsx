import React from "react";
import classes from "./RightSidebar.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import CustomSelect from "../../../components/custom-select/CustomSelect";
import { TOption } from "../../../components/custom-select/CustomSelect.types";
import { TProfile } from "../../profile/Profile.types";

type TRightSidebarProps = {
  onLogout: () => void;
  authUser: TProfile | null;
};

const categoryOptions: TOption[] = [
  { value: "support", label: "Support", id: "support" },
  { value: "logout", label: "Logout", id: "logout" },
];
const RightSidebar: React.FC<TRightSidebarProps> = ({ onLogout, authUser }) => {
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
      <CustomSelect
        onClick={onLogout}
        options={categoryOptions}
        authUser={authUser}
      />
    </div>
  );
};

export default RightSidebar;
