import React from "react";
import classes from "./SidebarFriends.module.scss";
import { TRouterProps } from "../Router";
import SidebarFriend from "./SidebarFriend/SidebarFriend";

interface ISidebarFriends extends TRouterProps {}

const SidebarFriends: React.FC<ISidebarFriends> = ({
  friends,
  setCurrentId,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.online}>
        {friends.length > 1 ? `${friends.length} friends` : "1 friend"}
      </div>
      <div className={classes.list}>
        {friends.map((item) => (
          <SidebarFriend
            setCurrentId={setCurrentId}
            key={item.id}
            id={item.id}
            username={item.name}
            photo={item.photos.small}
          />
        ))}
      </div>
    </div>
  );
};
export default SidebarFriends;
