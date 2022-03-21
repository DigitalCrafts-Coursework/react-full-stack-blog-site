import React from "react";
import { NavLink } from "react-router-dom";

export default function PostsList(props) {
  const handleClick = (postId) => {
    props.updateSelectedPost(postId);
  };

  const posts = props.posts.map((post) => {
    const randomNum = Math.floor(Math.random() * 10000);
    return (
      <NavLink
        to={`/post/${post.id}`}
        key={randomNum}
        onClick={() => handleClick(post.id)}
      >
        <input type="checkbox" style={{ visibility: "hidden" }} />
        <div>{post.title}</div>
      </NavLink>
    );
  });

  return <div>{posts}</div>;
}
