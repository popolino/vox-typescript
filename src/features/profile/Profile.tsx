import React, { useEffect, useState } from "react";
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

const allActions = {
  fetchUserProfile,
  fetchStatus,
  fetchUpdateStatus,
  ...profileActions,
};
const Profile = (props: any) => {
  const boundActions = useBoundActions(allActions);
  const { enqueueSnackbar } = useSnackbar();

  const profile = useAppSelector((state) => state.profileReducer.profile);
  const status = useAppSelector((state) => state.profileReducer.status);
  const authData = useAppSelector((state) => state.authReducer.authData);
  const currentId = useAppSelector((state) => state.profileReducer.currentId);
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
  useEffect(() => {
    currentId
      ? boundActions.fetchUserProfile(currentId) &&
        boundActions.fetchStatus(currentId)
      : authData &&
        boundActions.fetchUserProfile(authData.data.id) &&
        boundActions.fetchStatus(authData.data.id);
  }, []);
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
      />
      <NewPost profile={profile} owner={owner} />
      <Wall {...props} />
    </div>
  );
};

export default Profile;

// type TMapStateProps = {
//   profile: TProfile | null;
//   // email: string;
//   // login: string;
//   // id: number;
//   // isAuth: boolean;
//   wallData: TPost[];
//   postText: string;
//   status: string;
//   button: boolean;
//   edit: boolean;
// };
//
// type TMapDispatchProps = {
//   addPost: (newPost: TNewPost) => void;
//   setPostText: (postText: string) => void;
//   updateStatusThunk: (newStatus: string) => void;
//   getStatusThunk: (currentUserId: number) => void;
//   getUserProfileThunk: (currentUserId: number) => void;
//   savePhoto: () => void;
//   saveProfile: () => void;
//   setStatus: (status: string) => void;
// };
//
// type TProfileContainer = TMapStateProps & TMapDispatchProps;
//
// class ProfileContainer extends React.Component<TProfileContainer> {
//   props: any;
//   componentDidMount() {
//     const { id } = this.props;
//     let userId = +this.props.match.params.userId || id;
//     // userId && getUserProfileThunk(userId);
//     // userId && getStatusThunk(userId);
//   }
//   componentDidUpdate(prevProps: any) {
//     const currentUserId = +this.props.match.params.userId || this.props.id;
//     console.log(this.props);
//     const prevUserId = +prevProps.match.params.userId;
//     if (!prevUserId) return;
//     if (currentUserId !== prevUserId) {
//       this.props.getStatusThunk(currentUserId);
//       this.props.getUserProfileThunk(currentUserId);
//     }
//   }
//
//   render() {
//     const owner =
//       this.props.profile && this.props.profile.userId === this.props.id;
//     return <div>dsad</div>;
//   }
// }
// const mapStateToProps = (state: AppStateType): TMapStateProps => {
//   const { profileReducer} = state;
//   return {
//     profile: profileReducer.profile,
//     // email: authReducer.email,
//     // login: authReducer.login,
//     // id: authReducer.id,
//     // isAuth: authReducer.isAuth,
//     wallData: profileReducer.wallData,
//     postText: profileReducer.postText,
//     status: profileReducer.status,
//     button: profileReducer.button,
//     edit: profileReducer.edit,
//   };
// };
//
// export default compose(
//   connect<TMapStateProps, TMapDispatchProps, AppStateType>(mapStateToProps, {
//     // addPost,
//     // setPostText,
//     // updateStatusThunk,
//     // getStatusThunk,
//     getUserProfileThunk,
//     // savePhoto,
//     // saveProfile,
//     // setStatus,
//   }),
//   // @ts-ignore
// )(ProfileContainer);
