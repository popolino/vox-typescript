import React from "react";
import classes from "./Container.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";

export type TContainer_NavigationProps = {
  currentPage: string;
};

const Container: React.FC<TContainer_NavigationProps> = ({ currentPage }) => {
  console.log(currentPage)
  return (
    <div className={classes.container}>
      <div className={classes.tittle}>{currentPage}</div>
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
