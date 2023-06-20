import React from "react";
import classes from "./NavList.module.scss";
import { NavLink } from "react-router-dom";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";

type TNavLinkComponentProps = {
  path: string;
  id: string;
  section: string;
};

export const NavLinkComponent: React.FC<TNavLinkComponentProps> = ({
  path,
  id,
  section,
}) => (
  <NavLink
    to={path}
    className={(navData) =>
      navData.isActive ? `${classes.active} ${classes.link}` : classes.link
    }
  >
    <div>
      <SvgSelector id={id} className={classes["navigation-svg"]} />
    </div>
    <div className={classes.section}>{section}</div>
  </NavLink>
);
