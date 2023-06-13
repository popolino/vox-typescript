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
const Profile = () => {
  const boundActions = useBoundActions(allActions);

  const profile = useAppSelector((state) => state.profileReducer.profile);
  const status = useAppSelector((state) => state.profileReducer.status);
  const authData = useAppSelector((state) => state.authReducer.authData);
  const owner = authData && authData.data.id === profile?.userId;
  const wallData = useAppSelector((state) => state.profileReducer.wallData);

  const [newStatus, setNewStatus] = useState<string>("");
  const [profileEditMode, setProfileEditMode] = useState<boolean>(false);

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
  console.log(profile?.photos);
  return (
    <div className={classes.container}>
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
      <Wall profile={profile} wallData={wallData} owner={owner} />
    </div>
  );
};

export default Profile;
