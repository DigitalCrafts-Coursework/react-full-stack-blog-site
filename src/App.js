import React, { useState } from "react";
import Header from "./Components/Header";
import PostsList from "./Components/PostsList";
import NewPostInput from "./Components/NewPostInput";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([
    {
      title: "First blog post",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum totam magni consectetur incidunt sunt deleniti sapiente atque dicta ex obcaecati!",
      comments: [
        { name: "John", comment: "I liked it" },
        { name: "Tim", comment: "It stinks!" },
        { name: "Ann", comment: "I'm hungry'" },
      ],
    },
    {
      title: "Second blog post",
      content:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum totam magni consectetur incidunt sunt deleniti sapiente atque dicta ex obcaecati!",
      comments: [
        { name: "John", comment: "I liked it" },
        { name: "Tim", comment: "It stinks!" },
        { name: "Ann", comment: "I'm hungry'" },
      ],
    },
  ]);

  const addNewPost = (newPost) => {};

  return (
    <div className="App">
      <Header />
      <NewPostInput addNewPost={addNewPost} />
      <PostsList posts={posts} />
    </div>
  );
}

export default App;
