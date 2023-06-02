import React from "react";
import classes from "./Post.module.scss";
import avatar from "../../../../img/avatar.jpg";
import SvgSelector from "../../../../components/svgSelector/SvgSelector";

const Post = (props: any) => {
  return (
    <>
      <div className={`${classes["post-information"]} user`}>
        <div className={`${classes.avatar} sidebar__profile_photo`}>
          {/*<img*/}
          {/*  src={*/}
          {/*    props.profile && props.profile.photos.small*/}
          {/*      ? props.profile.photos.small*/}
          {/*      : avatar*/}
          {/*  }*/}
          {/*  alt=""*/}
          {/*/>*/}
        </div>
        <div className={`${classes.row} about-user`}>
          {/*<div className={classes.username}>*/}
          {/*  {props.profile && props.profile.fullName*/}
          {/*    ? props.profile.fullName*/}
          {/*    : props.login}*/}
          {/*</div>*/}
          {/*<div className={classes.online}>{props.online}</div>*/}
        </div>
      </div>
      <div className={classes["post-content"]}>
        {/*<p>{props.postComment}</p>*/}
        {/*{props.postPic && (*/}
        {/*  <div className={classes["post-picture"]}>*/}
        {/*    <img src={props.postPic} alt="" />*/}
        {/*  </div>*/}
        {/*)}*/}
        <div className={classes["post-tooltip"]}>
          <button>
            <SvgSelector id="like" />
            {/*<p>{props.likes}</p>*/}
          </button>
          <button>
            <SvgSelector id="comment" />
            {/*<p>{props.comments}</p>*/}
          </button>
          <button>
            <SvgSelector id="repost" />
            {/*<p>{props.reposts}</p>*/}
          </button>
        </div>
      </div>
    </>
  );
};
export default Post;
