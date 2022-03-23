import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import PostsList from "./Components/PostsList";
import NewPostInput from "./Components/NewPostInput";
import Post from "./Components/Post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([
    // {
    //   id: "",
    //   title: "First blog post",
    //   content:
    //     "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum totam magni consectetur incidunt sunt deleniti sapiente atque dicta ex obcaecati!",
    //   comments: [
    //     { name: "John", comment: "I liked it" },
    //     { name: "Tim", comment: "It stinks!" },
    //     { name: "Ann", comment: "I'm hungry'" },
    //   ],
    // },
  ]);

  const [selectedPost, setSelectedPost] = useState();

  //on page load retrieve data from db
  useEffect(() => {
    console.log("useEffect triggered");
    axios.get("/retrievePostData").then((response) => {
      console.log("data received");
      console.log(response.data);
      const { post_id, title, content, name, comment } = response.data;
      setPosts({
        id: post_id,
        title: title,
        content: content,
        comments: { name: name, comment: comment },
      });
    });
  });

  //add new post using form input (also add post to the db)
  const addNewPost = (newPost) => {
    const updatedPosts = [...posts];
    updatedPosts.push(newPost);
    const updatedPostsAddedId = updatedPosts.map((post) => {
      // const keyValue = { id: Math.floor(Math.random() * 10000) };
      return { ...post /*, ...keyValue */ };
    });
    setPosts(updatedPostsAddedId);
    axios
      .post("http://localhost:3000/addPost", {
        newPost: newPost,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //set a selected post by clicking on a listed post, data gets sent as props to routed page
  const updateSelectedPost = (selectedId) => {
    const selectedPostDetails = posts.find((post) => {
      return post.id === selectedId;
    });
    setSelectedPost(selectedPostDetails);
  };

  const updateComments = (newComment) => {
    console.log("click)");
    const selectedPostCommentsCopy = selectedPost.comments;
    selectedPostCommentsCopy.push(newComment);
    const selectedPostCopy = selectedPost;
    selectedPostCopy.comments = selectedPostCommentsCopy;
    setSelectedPost(selectedPostCopy);
    console.log(newComment);
    axios
      .post("http://localhost:3000/addComment", {
        newComment: newComment,
        id: selectedPost.id,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //updates posts in the postslist as well as the selected
  // let updatedPosts = posts;
  // console.log(posts);
  // console.log(updatedPosts);
  // updatedPosts.push(updatedPost);
  // setPosts(updatedPost);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <NewPostInput addNewPost={addNewPost} />
                <PostsList
                  posts={posts}
                  updateSelectedPost={updateSelectedPost}
                />
              </>
            }
          ></Route>
          <Route
            path="/post/:id"
            element={
              <Post
                selectedPost={selectedPost}
                updateComments={updateComments}
              />
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
