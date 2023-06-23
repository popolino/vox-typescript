import React, { useEffect, useState } from "react";
import classes from "./Profile.module.scss";
import ProfileHeader from "./profile-header/ProfileHeader";
import NewPost from "./new-post/NewPost";
import Wall from "./wall/Wall";
import { useAppSelector } from "../../app/hooks";
import { useBoundActions } from "../../app/store";
import {
  fetchEditProfile,
  fetchStatus,
  fetchUpdatePhoto,
  fetchUpdateStatus,
  fetchUserProfile,
  profileActions,
} from "./ProfileSlice";
import { fetchAuth } from "../auth/AuthSlice";
import { useParams } from "react-router-dom";
import { fetchFriends } from "../users/usersSlice";
import ProfilePending from "./profile-pending/ProfilePending";
import clsx from "clsx";

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
const Profile: React.FC = () => {
  const boundActions = useBoundActions(allActions);

  const profile = useAppSelector((state) => state.profileReducer.profile);
  const status = useAppSelector((state) => state.profileReducer.status);
  const authData = useAppSelector((state) => state.authReducer.authData);
  const owner = authData && authData.data.id === profile?.userId;
  const wallData = useAppSelector((state) => state.profileReducer.wallData);
  const friends = useAppSelector((state) => state.usersReducer.friends);
  const metaStatus = useAppSelector((state) => state.profileReducer.metaStatus);

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
  const onNavigateToMessenger = (
    id: number | undefined,
    username: string | undefined,
    photo: string | undefined
  ) => {
    boundActions.setSelectUser({ id: id, username: username, photo: photo });
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
  if (metaStatus === "idle")
    return (
      <div className={clsx(classes.container, "scrollbar")}>
        <ProfileHeader
          status={status}
          newStatus={newStatus}
          profileEditMode={profileEditMode}
          handleSetStatus={handleUpdateStatus}
          handleChangeStatus={handleChangeStatus}
          handleProfileEditMode={handleProfileEditMode}
          onMainPhotoSelected={onMainPhotoSelected}
          handleFetchDataForm={handleFetchDataForm}
          onNavigateToMessenger={onNavigateToMessenger}
          profile={profile}
          owner={owner}
          friends={friends}
        />
        <NewPost profile={profile} owner={owner} />
        <Wall profile={profile} wallData={wallData} owner={owner} />
      </div>
    );
  else if (metaStatus === "loading") return <ProfilePending owner={owner} />;
  else return <div>error</div>;
};

export default Profile;
