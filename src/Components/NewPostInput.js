import React, { useState } from "react";

export default function NewPostInput(props) {
  const [newPost, setNewPost] = useState();

  const handleChange = (event) => {
    setNewPost({
      title: "gfdsgdfsgd",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum totam magni consectetur incidunt sunt deleniti sapiente atque dicta ex obcaecati!",
      comments: [
        { name: "John", comment: "I liked it" },
        { name: "Tim", comment: "It stinks!" },
        { name: "Ann", comment: "I'm hungry'" },
      ],
    });
  };

  return (
    <div
      onSubmit={() => {
        props.addNewPost(newPost);
      }}
    >
      <label htmlFor="post-title">Post title</label>
      <input id="post-title" type="text" onChange={handleChange} />
      <label htmlFor="post-content">Post content</label>
      <input id="post-content" type="blog" onChange={handleChange} />
      <button>submit</button>
    </div>
  );
}
