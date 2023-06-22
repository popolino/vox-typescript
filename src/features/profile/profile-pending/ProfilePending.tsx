import classes from "./ProfilePending.module.scss";
import React from "react";
import clsx from "clsx";

type TProfilePendingProps = {
  owner: boolean | null;
};

const ProfilePending: React.FC<TProfilePendingProps> = ({ owner }) => {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.image}>
          <div className={classes.pending} />
        </div>
        <div className={classes["profile-header"]}>
          <div className={classes["profile-header__container"]}>
            <div className={classes["profile-header__content"]}>
              <div
                className={clsx(
                  "sidebar__profile_photo",
                  classes["header-avatar"]
                )}
              >
                <div />
              </div>
              <div className={clsx(classes.medium, classes.pending)} />
            </div>
          </div>
          <div className={classes["about-user"]}>
            <div className={classes["about-user__content"]}>
              <div className={classes["fullname_online"]}>
                <div className={clsx(classes.pending, classes.medium)} />
                <div
                  className={clsx(
                    classes.online,
                    classes.large,
                    classes.pending
                  )}
                />
              </div>
              <div className={classes["functions-container"]}>
                <div>
                  <div
                    className={clsx(
                      classes.status,
                      classes.pending,
                      classes.medium
                    )}
                  />
                </div>
                {!owner && (
                  <div className={clsx(classes.message, classes.pending)} />
                )}
              </div>
              <div className={classes["about-profile-data"]}>
                <div className={clsx(classes.pending, classes.large)} />
                <div className={clsx(classes.pending, classes.large)} />
                <div className={clsx(classes.pending, classes.large)} />
              </div>
            </div>
            <div className={classes["user-data"]}>
              <div className={classes.counters}>
                <div className={clsx(classes.counter, classes.pending)} />
                <div className={clsx(classes.counter, classes.pending)} />
                <div className={clsx(classes.counter, classes.pending)} />
              </div>
              {owner && (
                <div className={classes["change-container"]}>
                  <div className={clsx(classes.counter, classes.pending)} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePending;
