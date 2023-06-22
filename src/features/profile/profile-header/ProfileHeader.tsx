import React, { useRef, useState } from "react";
import classes from "./ProfileHeader.module.scss";
import header from "../../../assets/img/background.jpg";
import avatar from "../../../assets/img/user.png";
import ProfileStatus from "./ProfileStatus";
import { TProfile, TUser } from "../Profile.types";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import ProfileDataForm from "./ProfileDataForm";
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import useClickAway from "../../../hooks/useClickAway/useClickAway";

export type TProfileHeaderProps = {
  friends: TUser[];
  owner: boolean | null;
  profile: TProfile | null;
  status: string;
  newStatus: string;
  profileEditMode: boolean;
  handleSetStatus: () => void;
  handleChangeStatus: (newStatus: string) => void;
  handleProfileEditMode: (edit: boolean) => void;
  onMainPhotoSelected: (event: any) => void;
  onNavigateToMessenger: (
    id: number | undefined,
    username: string | undefined,
    photo: string | undefined
  ) => void;
  handleFetchDataForm: (
    aboutMe: string,
    lookingForAJobDescription: string,
    lookingForAJob: boolean,
    fullName: string
  ) => void;
};

const ProfileHeader: React.FC<TProfileHeaderProps> = ({
  friends,
  owner,
  profile,
  status,
  newStatus,
  profileEditMode,
  handleSetStatus,
  handleChangeStatus,
  handleProfileEditMode,
  onMainPhotoSelected,
  handleFetchDataForm,
  onNavigateToMessenger,
}) => {
  const [changePhoto, setChangePhoto] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => setChangePhoto(false));
  const handleChangePhoto = () => {
    changePhoto ? setChangePhoto(false) : setChangePhoto(true);
  };
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
                  profile && profile.photos && profile.photos.large
                    ? profile.photos.large
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
            <div className={classes["fullname_online"]}>
              <div className={classes.username}>
                <p>{profile && profile.fullName}</p>
              </div>
              <div className={classes.online}>
                <p>Last seen 22 minutes ago</p>
              </div>
            </div>
            <div className={classes["functions-container"]}>
              <ProfileStatus
                owner={owner}
                profileEditMode={profileEditMode}
                status={status}
                newStatus={newStatus}
                handleSetStatus={handleSetStatus}
                handleChangeStatus={handleChangeStatus}
                handleProfileEditMode={handleProfileEditMode}
              />
              {friends.find((friend) => friend.id === profile?.userId) &&
                !owner && (
                  <NavLink to="/messenger">
                    <button
                      className="button-blue"
                      onClick={() =>
                        onNavigateToMessenger(
                          profile?.userId,
                          profile?.fullName,
                          profile?.photos?.small
                        )
                      }
                    >
                      Message
                    </button>
                  </NavLink>
                )}
            </div>
            <ProfileDataForm
              profile={profile}
              owner={owner}
              handleFetchDataForm={handleFetchDataForm}
            />
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
                  <p>{friends.length}</p>
                </div>
                <div className={classes.title}>
                  <p>Friends</p>
                </div>
              </div>
            </div>
            {owner && (
              <div className={classes["change-container"]} ref={ref}>
                <input
                  type="file"
                  className={
                    changePhoto
                      ? classes.change
                      : clsx(classes.change, classes.hide)
                  }
                  onChange={onMainPhotoSelected}
                />
                <button onClick={handleChangePhoto} className={classes.more}>
                  <SvgSelector id="more" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
