import React, { useEffect, useRef, useState } from "react";
import classes from "./Profile.module.scss";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import NewPost from "./NewPost/NewPost";
import Wall from "./Wall/Wall";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useBoundActions } from "../../app/store";
import { useSnackbar } from "notistack";
import {
  fetchStatus,
  fetchUpdateStatus,
  fetchUserProfile,
  profileActions,
} from "./ProfileSlice";
import { fetchAuth } from "../Auth/AuthSlice";
import { useParams } from "react-router-dom";
import useClickAway from "../../components/useClickAway/useClickAway";

const allActions = {
  fetchUserProfile,
  fetchStatus,
  fetchUpdateStatus,
  fetchAuth,
  ...profileActions,
};
const Profile = (props: any) => {
  const boundActions = useBoundActions(allActions);

  const profile = useAppSelector((state) => state.profileReducer.profile);
  const status = useAppSelector((state) => state.profileReducer.status);
  const authData = useAppSelector((state) => state.authReducer.authData);
  const metaStatus = useAppSelector((state) => state.authReducer.metaStatus);
  const owner = authData && authData.data.id === profile?.userId;

  const ref = useRef<HTMLDivElement>(null);

  const [newStatus, setNewStatus] = useState<string>("");
  const [profileEditMode, setProfileEditMode] = useState<boolean>(false);

  useClickAway(ref, () => setProfileEditMode(false));
  const handleUpdateStatus = () => {
    boundActions.fetchUpdateStatus(newStatus);
  };

  const handleChangeStatus = (newStatus: string) => {
    setNewStatus(newStatus);
  };
  const handleProfileEditMode = (edit: boolean) => {
    setProfileEditMode(edit);
  };

  const currentId: string | undefined = useParams().userId;
  useEffect(() => {
    currentId
      ? boundActions.fetchUserProfile(Number(currentId)) &&
        boundActions.fetchStatus(Number(currentId))
      : authData &&
        boundActions.fetchUserProfile(authData.data.id) &&
        boundActions.fetchStatus(authData.data.id);
  }, [currentId, authData]);

  // if (metaStatus !== "fulfilled") return <div>loading...</div>;
  console.log(ref);

  return (
    <div className={classes.container}>
      {/*<div onClick={handleProfileEditMode}>{status}</div>*/}
      {profileEditMode && (
        <>
          <input
            type="text"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeStatus(event.target.value)
            }
          />
          <button onClick={handleUpdateStatus}>save</button>
        </>
      )}
      <ProfileHeader
        ref={ref}
        status={status}
        newStatus={newStatus}
        profileEditMode={profileEditMode}
        handleSetStatus={handleUpdateStatus}
        handleChangeStatus={handleChangeStatus}
        handleProfileEditMode={handleProfileEditMode}
        profile={profile}
        owner={owner}
      />
      <NewPost profile={profile} owner={owner} />
      <Wall {...props} />
    </div>
  );
};

export default Profile;
