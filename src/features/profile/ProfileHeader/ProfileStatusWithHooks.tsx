import classes from "./ProfileHeader.module.scss";
import React, { useRef } from "react";
import { TProfileHeaderProps } from "./ProfileHeader";
import useClickAway from "../../../components/useClickAway/useClickAway";

interface TStatusProps extends TProfileHeaderProps {}

const ProfileStatusWithHooks: React.FC<TStatusProps> = ({
  status,
  newStatus,
  profileEditMode,
  handleSetStatus,
  handleChangeStatus,
  handleProfileEditMode,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => handleProfileEditMode(false));
  const owner = true;
  return (
    <div ref={ref}>
      {profileEditMode && (
        <div className={classes.edit}>
          <input
            type="text"
            onChange={(event) => handleChangeStatus(event.target.value)}
            defaultValue={status}
          />
          <button
            className={classes.button}
            onClick={() => {
              handleProfileEditMode(false);
              handleSetStatus();
              // props.updateStatusThunk(props.newStatus);
              // props.getStatusThunk(props.id);
            }}
          >
            save
          </button>
        </div>
      )}
      {owner && (
        <button
          className={classes.status}
          onClick={() => {
            handleProfileEditMode(true);
          }}
        >
          {!newStatus ? status : newStatus}
          {!status && !newStatus && <p>Click here to post status</p>}
        </button>
      )}
      {!owner && status && (
        <div className={classes.status}>
          <p>{status}</p>
        </div>
      )}
    </div>
  );
};
export default ProfileStatusWithHooks;
