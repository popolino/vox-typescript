import React, { useRef, useState } from "react";
import useClickAway from "../../../components/useClickAway/useClickAway";
import PostReduxForm from "./NewPostForm";
import { TValuesProfileForm } from "../Profile.types";

const NewPost = (props: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState<boolean>(false);
  useClickAway(ref, () => setShowButton(false));
  const onAddPost = (values: TValuesProfileForm) => {
    props.addPost({
      online: "Just now",
      postComment: values.post,
    });
  };
  return (
    <>
      {props.owner && (
        <div className="post-container" id="text" ref={ref}>
          <PostReduxForm
            onSubmit={onAddPost}
            {...props}
            setShowButton={setShowButton}
            showButton={showButton}
          />
        </div>
      )}
    </>
  );
};
export default NewPost;
