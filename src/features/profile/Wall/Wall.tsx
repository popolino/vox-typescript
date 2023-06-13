// @ts-ignore
import React from "react";
// @ts-ignore
import Post from "./Post/Post.tsx";
import { TPost, TProfile } from "../Profile.types";
import { useBoundActions } from "../../../app/store";
import { profileActions } from "../ProfileSlice";
import { useAppSelector } from "../../../app/hooks";

type TWallProps = {
  profile: TProfile | null;
  owner: boolean | null;
  wallData: TPost[];
};

const Wall: React.FC<TWallProps> = ({ profile, owner, wallData }) => {
  const image = useAppSelector((state) => state.profileReducer.image);
  return (
    <>
      {owner && (
        <div className="post-container">
          {wallData.map((item) => (
            <Post
              image={image}
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
