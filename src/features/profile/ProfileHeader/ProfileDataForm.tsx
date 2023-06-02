import React from "react";

import { Field, reduxForm } from "redux-form";
import classes from "./ProfileHeader.module.scss";
import { clsx } from "clsx";
import { Input } from "../../../components/FormsControls/FormsControls";

const ProfileDataForm = (props: any) => {
  const handleOpenEditMode = () => {
    props.setProfileEditMode(true);
  };
  if (props.owner)
    return (
      <form
        onSubmit={props.handleSubmit}
        className={clsx(classes["about-profile-data"], classes.form)}
      >
        <div onClick={handleOpenEditMode}>
          <h2>About me: </h2>
          {props.profileEditMode ? (
            <Field
              name={"aboutMe"}
              component={Input}
              children={
                <input
                  type="text"
                  placeholder="Tell us about yourself"
                  defaultValue={props.profile.aboutMe}
                />
              }
            />
          ) : (
            <p>{props.profile.aboutMe}</p>
          )}
        </div>
        <div onClick={handleOpenEditMode}>
          <h2>Looking for a job description: </h2>
          {props.profileEditMode ? (
            <Field
              name={"lookingForAJobDescription"}
              component={Input}
              children={
                <input
                  type="text"
                  placeholder="Tell us about yourself"
                  defaultValue={props.profile.lookingForAJobDescription}
                />
              }
            />
          ) : (
            <p>{props.profile.lookingForAJobDescription}</p>
          )}
        </div>
        {props.profileEditMode && (
          <div onClick={handleOpenEditMode}>
            <h2>Full name: </h2>
            {props.profileEditMode && (
              <Field
                name={"fullName"}
                component={Input}
                children={
                  <input
                    type="text"
                    placeholder="Tell us about yourself"
                    defaultValue={props.profile.fullName}
                  />
                }
              />
            )}
          </div>
        )}
        <div onClick={handleOpenEditMode}>
          <h2>Looking for a job: </h2>
          {props.profileEditMode ? (
            <Field
              name={"lookingForAJob"}
              component={Input}
              children={
                <input
                  type="checkbox"
                  defaultChecked={props.profile.lookingForAJob}
                />
              }
            />
          ) : (
            <p>{props.profile.lookingForAJob ? "Yes" : "No"}</p>
          )}
        </div>
        {props.profileEditMode && <button className="button-blue">Save</button>}
      </form>
    );
  else
    return (
      <div className={classes["about-profile-data"]}>
        <div>
          <h2>About me:</h2>
          <p>{props.profile && props.profile.aboutMe}</p>
        </div>
        <div>
          <h2>Looking for a job description:</h2>
          <p>{props.profile && props.profile.lookingForAJobDescription}</p>
        </div>
        <div>
          <h2>Looking for a job:</h2>
          <p>{props.profile && props.profile.lookingForAJob ? "Yes" : "No"}</p>
        </div>
      </div>
    );
};

const ProfileReduxForm = reduxForm({
  form: "edit-profile",
})(ProfileDataForm);

export default ProfileReduxForm;
