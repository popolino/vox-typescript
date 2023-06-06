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
  const currentId = useAppSelector((state) => state.profileReducer.currentId);
  const metaStatus = useAppSelector((state) => state.authReducer.metaStatus);
  const owner = authData && authData.data.id === profile?.userId;

  const [newStatus, setNewStatus] = useState<string>("");
  const [profileEditMode, setProfileEditMode] = useState<boolean>(false);

  // const handleSetStatus = () => boundActions.setStatus(newStatus);
  const handleUpdateStatus = () => {
    boundActions.fetchUpdateStatus(newStatus);
  };

  const handleChangeStatus = (newStatus: string) => {
    setNewStatus(newStatus);
  };
  const handleProfileEditMode = (edit: boolean) => {
    setProfileEditMode(edit);
  };

  const prevCountRef = useRef<number | null>(null);
  useEffect(() => {
    prevCountRef.current = currentId;
    console.log(currentId);
    console.log(prevCountRef);
  }, [currentId]);
  useEffect(() => {
    currentId
      ? boundActions.fetchUserProfile(currentId) &&
        boundActions.fetchStatus(currentId)
      : authData &&
        boundActions.fetchUserProfile(authData.data.id) &&
        boundActions.fetchStatus(authData.data.id);
  }, [metaStatus]);

  if (metaStatus !== "fulfilled") return <div>loading...</div>;
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
