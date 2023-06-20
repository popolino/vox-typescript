import React from "react";
import classes from "./Container.module.scss";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";
import { useParams } from "react-router-dom";

export type TContainer_NavigationProps = {
  headerTitle: string;
};

const Container: React.FC<TContainer_NavigationProps> = ({ headerTitle }) => {
  return (
    <div className={classes.container}>
      <div className={classes.tittle}>{headerTitle}</div>
      <div className="search">
        <div className={classes.svg}>
          <SvgSelector id="search" className={classes["search-svg"]} />
        </div>
        <input
          className="search-input"
          placeholder="Find friends, communities and more here"
          type="text"
        />
      </div>
    </div>
  );
};

export default Container;
