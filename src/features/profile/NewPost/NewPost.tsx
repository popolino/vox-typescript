import React, { useEffect, useRef, useState } from "react";
import useClickAway from "../../../components/useClickAway/useClickAway";
import { TProfile, TValuesProfileForm } from "../Profile.types";
import { useBoundActions } from "../../../app/store";
import {
  fetchStatus,
  fetchUpdateStatus,
  fetchUserProfile,
  profileActions,
} from "../ProfileSlice";
import { fetchAuth } from "../../Auth/AuthSlice";
import classes from "./NewPost.module.scss";
import avatar from "../../../img/user.png";
import { Field } from "redux-form";
import { FormsControls } from "../../../components/FormsControls/FormsControls";
import SvgSelector from "../../../components/svgSelector/SvgSelector";
import { useAppSelector } from "../../../app/hooks";

const allActions = {
  ...profileActions,
};

type TNewPostProps = {
  profile: TProfile | null;
  owner: boolean | null;
};
const NewPost: React.FC<TNewPostProps> = ({ profile, owner }) => {
  const boundActions = useBoundActions(allActions);

  const image = useAppSelector((state) => state.profileReducer.image);

  const [postText, setPostText] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState<boolean>(false);
  useClickAway(ref, () => setShowButton(false));
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      boundActions.addImagePost(URL.createObjectURL(file));
    }
  };
  const onAddPost = () => {
    boundActions.addPost({
      online: "Just now",
      postComment: postText,
    });

    setPostText("");
    setShowButton(false);
    boundActions.cleanImagePost();
  };
  return (
    <>
      {owner && (
        <div className="post-container" id="text" ref={ref}>
          <div className={classes.row}>
            <div className={`${classes.avatar} sidebar__profile_photo`}>
              <img
                src={profile && profile.photos ? profile.photos.small : avatar}
                alt=""
              />
            </div>
            <div className={classes["post-content"]}>
              <div className={classes.textarea}>
                <textarea
                  placeholder="What’s on your mind?"
                  onClick={() => setShowButton(true)}
                  onChange={(event) => setPostText(event.target.value)}
                  value={postText}
                />
              </div>
              {image && <img src={image} className={classes["select-image"]} />}
            </div>
          </div>
          <div className={classes.content}>
            <div className={classes["content-button"]}>
              <SvgSelector id="image" />
              <input
                type="file"
                onChange={handleImageChange}
                className="custom-file-input"
              />
              <div className={classes.title}>
                <p>Image</p>
              </div>
            </div>
            <div className={classes["content-button"]}>
              <SvgSelector id="music" />
              <div className={classes.title}>
                <p>Audio</p>
              </div>
            </div>
            <div className={classes["content-button"]}>
              <SvgSelector id="videos" />
              <div className={classes.title}>
                <p>Video</p>
              </div>
            </div>
          </div>
          <div>{showButton && <button onClick={onAddPost}>post</button>}</div>
        </div>
      )}
    </>
  );
};
export default NewPost;
