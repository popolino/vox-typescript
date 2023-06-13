import React from "react";
import classes from "./Post.module.scss";
import avatar from "../../../../img/avatar.jpg";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";
import { TProfile } from "../../Profile.types";

type TPostProps = {
  avatar: string;
  online: string;
  postComment: string;
  postPic: string;
  likes: number;
  comments: number;
  reposts: number;
  profile: TProfile;
  image: File | null;
};

const Post: React.FC<TPostProps> = ({
  avatar,
  online,
  postComment,
  postPic,
  likes,
  comments,
  reposts,
  profile,
  image,
}) => {
  return (
    <>
      <div className={`${classes["post-information"]} user`}>
        <div className={`${classes.avatar} sidebar__profile_photo`}>
          <img
            src={profile && profile.photos ? profile.photos.small : avatar}
            alt=""
          />
        </div>
        <div className={`${classes.row} about-user`}>
          <div className={classes.username}>
            {profile && profile.fullName && profile.fullName}
          </div>
          <div className={classes.online}>{online}</div>
        </div>
      </div>
      <div className={classes["post-content"]}>
        <p>{postComment}</p>

        {postPic && (
          <div className={classes["post-picture"]}>
            {image && typeof postPic !== "string" ? (
              <img src={URL.createObjectURL(image)} />
            ) : (
              <img src={postPic} alt="" />
            )}
          </div>
        )}
        <div className={classes["post-tooltip"]}>
          <button>
            <SvgSelector id="like" />
            <p>{likes}</p>
          </button>
          <button>
            <SvgSelector id="comment" />
            <p>{comments}</p>
          </button>
          <button>
            <SvgSelector id="repost" />
            <p>{reposts}</p>
          </button>
        </div>
      </div>
    </>
  );
};
export default Post;
