import React from "react";
import classes from "./SidebarFriends.module.scss";
import { useAppSelector } from "../../app/hooks";
import SidebarFriend from "./sidebar-friend/SidebarFriend";

const SidebarFriends: React.FC = () => {
  const friends = useAppSelector((state) => state.usersReducer.friends);

  return (
    <div className={classes.container}>
      <div className={classes.online}>
        {friends.length > 1 ? `${friends.length} friends` : "1 friend"}
      </div>
      <div className={classes.list}>
        {friends.map((item) => (
          <SidebarFriend
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
