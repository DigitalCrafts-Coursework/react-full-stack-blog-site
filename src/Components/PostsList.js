import React from "react";

export default function PostsList(props) {
  const posts = props.posts.map((post) => {
    return (
      <div key={Math.floor(Math.random() * 10000)}>
        <input type="checkbox" style={{ visibility: "hidden" }} />
        <div>{post.title}</div>
        <div>{post.content}</div>
      </div>
    );
  });

  return <div>{posts}</div>;
}
