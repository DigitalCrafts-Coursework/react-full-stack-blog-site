import React from "react";

export default function Post(props) {
  console.log(props.selectedPost);
  const { id, title, content, comments } = props.selectedPost;
  console.log(id);
  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>
      <div>See comments</div>
    </div>
  );
}
