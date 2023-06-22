import classes from "./ProfileHeader.module.scss";
import React, { useRef } from "react";
import useClickAway from "../../../hooks/useClickAway/useClickAway";

type TProfileStatus = {
  owner: boolean | null;
  status: string;
  newStatus: string;
  profileEditMode: boolean;
  handleSetStatus: () => void;
  handleChangeStatus: (newStatus: string) => void;
  handleProfileEditMode: (edit: boolean) => void;
};

const ProfileStatus: React.FC<TProfileStatus> = ({
  owner,
  status,
  newStatus,
  profileEditMode,
  handleSetStatus,
  handleChangeStatus,
  handleProfileEditMode,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => handleProfileEditMode(false));
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
            className="button-blue-small"
            onClick={() => {
              handleProfileEditMode(false);
              handleSetStatus();
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
export default ProfileStatus;
