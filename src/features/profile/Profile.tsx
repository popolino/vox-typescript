import React, { useEffect, useRef, useState } from "react";
import classes from "./Profile.module.scss";
import ProfileHeader from "./ProfileHeader/ProfileHeader";
import NewPost from "./NewPost/NewPost";
import Wall from "./Wall/Wall";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useBoundActions } from "../../app/store";
import { useSnackbar } from "notistack";
import {
  fetchEditProfile,
  fetchStatus,
  fetchUpdatePhoto,
  fetchUpdateStatus,
  fetchUserProfile,
  profileActions,
} from "./ProfileSlice";
import { fetchAuth } from "../Auth/AuthSlice";
import { useParams } from "react-router-dom";
import useClickAway from "../../components/useClickAway/useClickAway";
import { fetchFriends } from "../users/usersSlice";

const allActions = {
  fetchUserProfile,
  fetchStatus,
  fetchUpdateStatus,
  fetchAuth,
  fetchUpdatePhoto,
  fetchEditProfile,
  fetchFriends,
  ...profileActions,
};
const Profile = () => {
  const boundActions = useBoundActions(allActions);

  const profile = useAppSelector((state) => state.profileReducer.profile);
  const status = useAppSelector((state) => state.profileReducer.status);
  const authData = useAppSelector((state) => state.authReducer.authData);
  const owner = authData && authData.data.id === profile?.userId;
  const wallData = useAppSelector((state) => state.profileReducer.wallData);
  const friends = useAppSelector((state) => state.usersReducer.friends);

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

  const onMainPhotoSelected = (event: any) => {
    boundActions.fetchUpdatePhoto(event.target.files[0]);
  };
  const handleFetchDataForm = (
    aboutMe: string,
    lookingForAJobDescription: string,
    lookingForAJob: boolean,
    fullName: string
  ) => {
    boundActions.fetchEditProfile({
      aboutMe,
      lookingForAJobDescription,
      lookingForAJob,
      fullName,
    });
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
  return (
    <div className={classes.container}>
      <ProfileHeader
        status={status}
        newStatus={newStatus}
        profileEditMode={profileEditMode}
        handleSetStatus={handleUpdateStatus}
        handleChangeStatus={handleChangeStatus}
        handleProfileEditMode={handleProfileEditMode}
        onMainPhotoSelected={onMainPhotoSelected}
        handleFetchDataForm={handleFetchDataForm}
        profile={profile}
        owner={owner}
        friends={friends}
      />
      <NewPost profile={profile} owner={owner} />
      <Wall profile={profile} wallData={wallData} owner={owner} />
    </div>
  );
};

export default Profile;
