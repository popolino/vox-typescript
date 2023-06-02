// @ts-ignore
import React from "react";
// @ts-ignore
import Post from "./Post/Post.tsx";

const Wall = (props: any) => {
  const owner = true;
  return (
    <>
      {owner && (
        <div className="post-container">
          {/*{wallData.map((item) => (*/}
          {/*  <Post*/}
          {/*    key={item.id}*/}
          {/*    username={item.username}*/}
          {/*    avatar={item.avatar}*/}
          {/*    online={item.online}*/}
          {/*    postComment={item.postComment}*/}
          {/*    postPic={item.postPic}*/}
          {/*    likes={item.likes}*/}
          {/*    comments={item.comments}*/}
          {/*    reposts={item.reposts}*/}
          {/*    profile={props.profile}*/}
          {/*    login={props.login}*/}
          {/*  />*/}
          {/*))}*/}
        </div>
      )}
    </>
  );
};

export default Wall;
