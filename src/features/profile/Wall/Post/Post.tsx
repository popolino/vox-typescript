import React, { useState } from "react";
import classes from "./Post.module.scss";
import avatar from "../../../../img/avatar.jpg";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";
import { TProfile } from "../../Profile.types";

type TPostProps = {
  avatar: string;
  imagePost: File | null;
  online: string;
  postComment: string;
  postPic: string;
  likes: number;
  comments: number;
  reposts: number;
  profile: TProfile;
};

const Post: React.FC<TPostProps> = ({
  imagePost,
  avatar,
  online,
  postComment,
  postPic,
  likes,
  comments,
  reposts,
  profile,
}) => {
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(likes);
  const handleSetLike = () => {
    like ? setLike(false) : setLike(true);
    !like ? setLikeCount(likes + 1) : setLikeCount(likeCount - 1);
  };

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
            {imagePost && typeof postPic !== "string" ? (
              <img src={URL.createObjectURL(imagePost)} />
            ) : (
              <img src={postPic} alt="" />
            )}
          </div>
        )}
        <div className={classes["post-tooltip"]}>
          <button onClick={handleSetLike}>
            <SvgSelector
              id="like"
              className={like ? classes["like-active"] : ""}
            />
            <p>{likeCount}</p>
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
