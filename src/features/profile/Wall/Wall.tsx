import React from "react";
import { TPost, TProfile } from "../Profile.types";
import Post from "./post/Post";

type TWallProps = {
  profile: TProfile | null;
  owner: boolean | null;
  wallData: TPost[];
};

const Wall: React.FC<TWallProps> = ({ profile, owner, wallData }) => {
  return (
    <>
      {owner && (
        <div className="post-container">
          {wallData.map((item) => (
            <Post
              key={item.id}
              avatar={item.avatar}
              online={item.online}
              postComment={item.postComment}
              postPic={item.postPic}
              likes={item.likes}
              comments={item.comments}
              reposts={item.reposts}
              profile={profile}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Wall;
