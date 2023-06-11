import React, { useEffect, useRef, useState } from "react";
import classes from "./ProfileHeader.module.scss";
import header from "../../../img/image 4.png";
import avatar from "../../../img/avatar.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileReduxForm from "./ProfileDataForm";
import { TProfile } from "../Profile.types";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { useBoundActions } from "../../../app/store";
import { fetchUpdatePhoto, profileActions } from "../ProfileSlice";
import useClickAway from "../../../components/useClickAway/useClickAway";
// import { SvgSelector } from "../../../components/SvgSelector/SvgSelector";
// import ProfileStatusWithHooks from "./ProfileStatusWithHooks.tsx";
// import ProfileReduxForm from "./ProfileDataForm.tsx";

export type TProfileHeaderProps = {
  ref: React.RefObject<HTMLDivElement>;

  owner: boolean | null;
  profile: TProfile | null;
  status: string;
  newStatus: string;
  profileEditMode: boolean;
  handleSetStatus: () => void;
  handleChangeStatus: (newStatus: string) => void;
  handleProfileEditMode: (edit: boolean) => void;
};

const allActions = {
  fetchUpdatePhoto,
  ...profileActions,
};

const ProfileHeader: React.FC<TProfileHeaderProps> = ({
  owner,
  ref,
  profile,
  status,
  newStatus,
  profileEditMode,
  handleSetStatus,
  handleChangeStatus,
  handleProfileEditMode,
}) => {
  const [changePhoto, setChangePhoto] = useState<boolean>(false);
  const boundActions = useBoundActions(allActions);

  const handleChangePhoto = () => {
    changePhoto ? setChangePhoto(false) : setChangePhoto(true);
  };
  const onMainPhotoSelected = (event: any) => {
    boundActions.fetchUpdatePhoto(event.target.files[0]);
    // event.target.files.length && boundActions.savePhoto(event.target.files[0]);
  };

  // const onSubmit = (formData: any) => {
  //   setProfileEditMode(false);
  //   props.saveProfile(formData);
  // };

  return (
    <div className={classes.header}>
      <div className={classes.image}>
        <img src={header} alt="" />
      </div>
      <div className={classes["profile-header"]}>
        <div className={classes["profile-header__container"]}>
          <div className={classes["profile-header__content"]}>
            <div
              className={`${classes["header-avatar"]} sidebar__profile_photo`}
            >
              <img
                src={
                  profile && profile.photos && profile.photos.small
                    ? profile.photos.small
                    : avatar
                }
                alt=""
              />
            </div>
            <div className={`${classes["header-unique-name"]} unique-name`}>
              {profile && `@user${profile.userId}`}
            </div>
          </div>
        </div>
        <div className={classes["about-user"]}>
          <div className={classes["about-user__content"]}>
            <div className={classes.username}>
              <p>{profile && profile.fullName}</p>
            </div>
            <ProfileStatusWithHooks
              ref={ref}
              owner={owner}
              profileEditMode={profileEditMode}
              status={status}
              newStatus={newStatus}
              handleSetStatus={handleSetStatus}
              handleChangeStatus={handleChangeStatus}
              handleProfileEditMode={handleProfileEditMode}
              profile={profile}
            />
            <div className={classes.online}>
              <p>Last seen 22 minutes ago</p>
            </div>
          </div>
          <div className={classes["user-data"]}>
            <div className={classes.counters}>
              <div className={classes.counter}>
                <div className={classes.number}>
                  <p>68</p>
                </div>
                <div className={classes.title}>
                  <p>Photos</p>
                </div>
              </div>
              <div className={classes.counter}>
                <div className={classes.number}>
                  <p>568</p>
                </div>
                <div className={classes.title}>
                  <p>Followers</p>
                </div>
              </div>
              <div className={classes.counter}>
                <div className={classes.number}>
                  <p>5.5k</p>
                </div>
                <div className={classes.title}>
                  <p>Friends</p>
                </div>
              </div>
            </div>
            {owner && (
              <div className={classes["change-container"]}>
                <input
                  type="file"
                  name="file"
                  className={changePhoto ? classes.change : classes.hide}
                  onChange={onMainPhotoSelected}
                />
                <button onClick={handleChangePhoto} className={classes.more}>
                  <SvgSelector id="more" />
                </button>
              </div>
            )}
          </div>
          {/*{profileEditMode && (*/}
          {/*  <div*/}
          {/*    className="backdrop"*/}
          {/*    onClick={() => handleProfileEditMode(false)}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
