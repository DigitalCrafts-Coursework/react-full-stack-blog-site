import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function PostsList(props) {
  const [checkboxVisibility, setCheckboxVisibility] = useState("hidden");

  const handleClick = (postId) => {
    props.updateSelectedPost(postId);
  };

  useEffect(() => {
    props.userControls
      ? setCheckboxVisibility("visible")
      : setCheckboxVisibility("hidden");
  }, [props.userControls]);

  const posts = props.posts.map((post) => {
    const randomNum = Math.floor(Math.random() * 10000);
    return (
      <div>
        <input
          type="checkbox"
          onClick={() => props.deletePost(post.id)}
          style={{ visibility: checkboxVisibility }}
        />
        <NavLink
          to={`/post/${post.id}`}
          key={randomNum}
          onClick={() => handleClick(post.id)}
        >
          <div>{post.title}</div>
        </NavLink>
      </div>
    );
  });

  return <div>{posts}</div>;
}
