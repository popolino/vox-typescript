import React, { useState } from "react";
import classes from "./CustomSelect.module.scss";
import clsx from "clsx";
import SvgSelector from "../svgSelector/SvgSelector";
import avatar from "../../img/avatar.jpg";
import { TOption } from "./CustomSelect.types";

type TCustomSelectProps = {
  options: TOption[];
  onClick: () => void;
};
const CustomSelect: React.FC<TCustomSelectProps> = ({ options, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const handleCloseSelect = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  };
  return (
    <div className={classes.user}>
      <div className="sidebar__profile_photo">
        <img src={avatar} alt="" />
      </div>
      <div
        className={clsx(classes.sdg, classes.container, {
          [classes.active]: isOpen,
        })}
      >
        <button className={classes.row} onClick={() => setIsOpen(true)}>
          <SvgSelector
            id="arrow"
            className={clsx(classes.symbol, {
              [classes["active-symbol"]]: isOpen,
            })}
          />
        </button>

        {isOpen && (
          <ul className={clsx({ [classes.closing]: isClosing })}>
            {options.map((option) => (
              <li
                onMouseDown={() => option.value === "logout" && onClick()}
                key={option.value}
                onClick={() => {
                  handleCloseSelect();
                }}
              >
                <SvgSelector id={option.id} className={classes.svg} />
                <p>{option.label}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOpen && (
        <button className={classes.backdrop} onClick={handleCloseSelect} />
      )}
    </div>
  );
};
export default CustomSelect;
