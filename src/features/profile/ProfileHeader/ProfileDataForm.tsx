import React, { useState } from "react";

import { Field, reduxForm } from "redux-form";
import classes from "./ProfileHeader.module.scss";
import { clsx } from "clsx";
import { Input } from "../../../components/FormsControls/FormsControls";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TProfile } from "../Profile.types";
import CustomTextField from "../../../components/CustomTextField/CustomTextField";

type TProfileDataProps = {
  profile: TProfile | null;
  owner: boolean | null;
  handleFetchDataForm: (
    aboutMe: string,
    lookingForAJobDescription: string,
    lookingForAJob: boolean,
    fullName: string
  ) => void;
};

const ProfileDataForm: React.FC<TProfileDataProps> = ({
  profile,
  owner,
  handleFetchDataForm,
}) => {
  type TProfileDataForm = {
    aboutMe: string;
    lookingForAJobDescription: string;
    lookingForAJob: boolean;
    fullName: string;
  };
  const { handleSubmit, control, formState, setValue } =
    useForm<TProfileDataForm>({
      mode: "all",
      defaultValues: {
        aboutMe: profile?.aboutMe || "",
        lookingForAJobDescription: profile?.lookingForAJobDescription,
        lookingForAJob: profile?.lookingForAJob,
        fullName: profile?.fullName,
      },
    });

  const [editMode, setEditMode] = useState<boolean>(false);

  const onSubmit: SubmitHandler<TProfileDataForm> = (data) => {
    handleFetchDataForm(
      data.aboutMe,
      data.lookingForAJobDescription,
      data.lookingForAJob,
      data.fullName
    );
    setEditMode(false);
  };
  const handleEditMode = () => {
    setEditMode(true);
    setValue("aboutMe", profile?.aboutMe || "");
  };
  if (owner)
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(classes["about-profile-data"], classes.form)}
      >
        <div>
          <h2>About me:</h2>
          {editMode ? (
            <div>
              <Controller
                name="aboutMe"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <input
                    type="text"
                    value={value}
                    // defaultValue={value}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                )}
              />
            </div>
          ) : (
            <p onClick={handleEditMode}>{profile?.aboutMe}</p>
          )}
        </div>

        <div>
          <h2>Looking for a job description:</h2>
          {editMode ? (
            <Controller
              name="lookingForAJobDescription"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="text"
                  value={value}
                  defaultValue={profile?.lookingForAJobDescription}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          ) : (
            <p onClick={handleEditMode}>{profile?.lookingForAJobDescription}</p>
          )}
        </div>
        <div>
          <h2>Looking for a job:</h2>
          {editMode ? (
            <Controller
              name="lookingForAJob"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="checkbox"
                  defaultChecked={profile?.lookingForAJob}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          ) : (
            <p onClick={handleEditMode}>
              {profile?.lookingForAJob ? "Yes" : "No"}
            </p>
          )}
        </div>
        {editMode && (
          <div>
            <h2>FullName:</h2>
            <Controller
              name="fullName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="text"
                  value={value}
                  defaultValue={profile?.fullName}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </div>
        )}
        {editMode && (
          <button
            type="submit"
            disabled={!formState.isValid}
            className="button-blue-small"
          >
            Save
          </button>
        )}
      </form>
    );
  else
    return (
      <div className={classes["about-profile-data"]}>
        <div>
          <h2>About me:</h2>
          <p>{profile && profile.aboutMe}</p>
        </div>
        <div>
          <h2>Looking for a job description:</h2>
          <p>{profile && profile.lookingForAJobDescription}</p>
        </div>
        <div>
          <h2>Looking for a job:</h2>
          <p>{profile && profile.lookingForAJob ? "Yes" : "No"}</p>
        </div>
      </div>
    );
};

export default ProfileDataForm;
