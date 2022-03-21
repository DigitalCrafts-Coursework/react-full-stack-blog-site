import React, { useState } from "react";
import Header from "./Components/Header";
import PostsList from "./Components/PostsList";
import NewPostInput from "./Components/NewPostInput";
import Post from "./Components/Post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
  ]);

  const [selectedPost, setSelectedPost] = useState();

  const addNewPost = (newPost) => {
    const updatedPosts = [...posts];
    updatedPosts.push(newPost);
    const updatedPostsAddedId = updatedPosts.map((post) => {
      const keyValue = { id: Math.floor(Math.random() * 10000) };
      return { ...post, ...keyValue };
    });
    setPosts(updatedPostsAddedId);
  };

  const updateSelectedPost = (selectedId) => {
    console.log("click");
    const selectedPostDetails = posts.find((post) => {
      return post.id === selectedId;
    });
    console.log(selectedPostDetails);
    setSelectedPost(selectedPostDetails);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <NewPostInput addNewPost={addNewPost} />
        <PostsList posts={posts} updateSelectedPost={updateSelectedPost} />
        <Routes>
          <Route
            path="/post/:id"
            element={<Post selectedPost={selectedPost} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
