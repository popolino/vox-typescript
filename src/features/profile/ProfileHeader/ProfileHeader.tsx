import React, { useEffect, useState } from "react";
import classes from "./ProfileHeader.module.scss";
import header from "../../../img/image 4.png";
import avatar from "../../../img/avatar.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileReduxForm from "./ProfileDataForm";
import { TProfile } from "../Profile.types";
// import { SvgSelector } from "../../../components/SvgSelector/SvgSelector";
// import ProfileStatusWithHooks from "./ProfileStatusWithHooks.tsx";
// import ProfileReduxForm from "./ProfileDataForm.tsx";

export type TProfileHeaderProps = {
  profile: TProfile | null;
  status: string;
  newStatus: string;
  profileEditMode: boolean;
  handleSetStatus: () => void;
  handleChangeStatus: (newStatus: string) => void;
  handleProfileEditMode: (edit: boolean) => void;
};

const ProfileHeader: React.FC<TProfileHeaderProps> = ({
  profile,
  status,
  newStatus,
  profileEditMode,
  handleSetStatus,
  handleChangeStatus,
  handleProfileEditMode,
}) => {
  //
  // const handleChangePhoto = () => {
  //   changePhoto ? setChangePhoto(false) : setChangePhoto(true);
  // };
  // const onMainPhotoSelected = (event: any) => {
  //   event.target.files.length && props.savePhoto(event.target.files[0]);
  // };
  //
  // const onSubmit = (formData: any) => {
  //   setProfileEditMode(false);
  //   props.saveProfile(formData);
  // };
  // useEffect(() => {
  //   props.status && props.setStatus(props.status);
  // }, [props.status]);
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
                  profile && profile.photos.small
                    ? profile.photos.small
                    : avatar
                }
                alt=""
              />
            </div>
            {/*<div className={`${classes["header-unique-name"]} unique-name`}>*/}
            {/*  {props.profile ? `@user${props.profile.userId}` : props.email}*/}
            {/*</div>*/}
          </div>
        </div>
        <div className={classes["about-user"]}>
          <div className={classes["about-user__content"]}>
            <div className={classes.username}>
              {/*<p>{profile ? profile.fullName : login}</p>*/}
            </div>
            {/*<ProfileStatusWithHooks*/}
            {/*  profileEditMode={profileEditMode}*/}
            {/*  status={status}*/}
            {/*  newStatus={newStatus}*/}
            {/*  handleSetStatus={handleSetStatus}*/}
            {/*  handleChangeStatus={handleChangeStatus}*/}
            {/*  handleProfileEditMode={handleProfileEditMode}*/}
            {/*/>*/}
            {/*  <ProfileReduxForm*/}
            {/*    {...props}*/}
            {/*    onSubmit={onSubmit}*/}
            {/*    profileEditMode={profileEditMode}*/}
            {/*    setProfileEditMode={setProfileEditMode}*/}
            {/*  />*/}
            {/*</div>*/}
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
            {/*{props.owner && (*/}
            {/*  <div className={classes["change-container"]}>*/}
            {/*    <input*/}
            {/*      type="file"*/}
            {/*      name="file"*/}
            {/*      className={changePhoto ? classes.change : classes.hide}*/}
            {/*      onChange={onMainPhotoSelected}*/}
            {/*    />*/}
            {/*    <button onClick={handleChangePhoto} className={classes.more}>*/}
            {/*      /!*<SvgSelector id="more" />*!/*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
          {/*{editMode && <div className="backdrop" onClick={onHideEdit} />}*/}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
