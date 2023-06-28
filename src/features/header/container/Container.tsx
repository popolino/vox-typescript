import React, { useEffect, useState } from "react";
import classes from "./Container.module.scss";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../users/Users.types";
import { IconButton } from "@mui/material";
import clsx from "clsx";

export type TContainerProps = {
  username: string;
  headerTitle: string;
  findMode: boolean;
  foundUser: TUser[];
  setUsername: (username: string) => void;
  setFindMode: (findMode: boolean) => void;
  handleFindUser: (username: string) => void;
  cleanFoundUser: () => void;
};

const Container: React.FC<TContainerProps> = ({
  username,
  setUsername,
  headerTitle,
  findMode,
  foundUser,
  setFindMode,
  handleFindUser,
  cleanFoundUser,
}) => {
  let navigate = useNavigate();

  const [width, setWidth] = useState(window.innerWidth);

  const isWideScreen = width > 480;
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" && findMode && username !== "") {
        handleFindUser(username);
        navigate("/users");
        foundUser && cleanFoundUser();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [foundUser, findMode, username]);
  return (
    <div className={classes.container}>
      <div className={classes.tittle}>{headerTitle}</div>
      {!isWideScreen && !findMode && (
        <IconButton onClick={() => setFindMode(true)}>
          <SvgSelector id="search" className={classes["search-svg"]} />
        </IconButton>
      )}
      {!isWideScreen && findMode && (
        <div className={clsx("search", classes["mobile-search"])}>
          <input
            className="search-input"
            placeholder="Find friends, communities and more..."
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            onFocus={() => setFindMode(true)}
            onBlur={() => setFindMode(false)}
            autoFocus={true}
          />
        </div>
      )}
      <div className={clsx("search", "search-hide")}>
        {isWideScreen && (
          <div className={classes.svg}>
            <SvgSelector id="search" />
          </div>
        )}
        {!isWideScreen && (
          <input
            className="search-input"
            placeholder="Find friends, communities and more..."
            type="text"
            onChange={(event) => setUsername(event.target.value)}
            value={username}
            onFocus={() => setFindMode(true)}
            onBlur={() => setFindMode(false)}
          />
        )}
        <input
          className="search-input"
          placeholder="Find friends, communities and more..."
          type="text"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
          onFocus={() => setFindMode(true)}
          onBlur={() => setFindMode(false)}
        />
      </div>
    </div>
  );
};

export default Container;
