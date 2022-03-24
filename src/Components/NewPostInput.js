import React, { useState } from "react";

export default function NewPostInput(props) {
  const [newPost, setNewPost] = useState({
    id: "",
    title: "",
    content: "",
    comments: [],
  });

  const handleChange = (event) => {
    const randomNum = Math.floor(Math.random() * 10000);
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setNewPost({
      ...newPost,
      [inputName]: inputValue,
      id: randomNum,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNewPost(newPost);
  };

  return props.userControls ? (
    <form onSubmit={handleSubmit}>
      <label htmlFor="post-title">Post title</label>
      <input
        id="post-title"
        type="text"
        name="title"
        value={newPost.title}
        onChange={handleChange}
      />
      <label htmlFor="post-content">Post content</label>
      <input
        id="post-content"
        type="blog"
        name="content"
        value={newPost.content}
        onChange={handleChange}
      />
      <button type="submit">submit</button>
    </form>
  ) : (
    <div></div>
  );
}
