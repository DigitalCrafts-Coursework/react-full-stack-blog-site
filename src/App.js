import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import PostsList from "./Components/PostsList";
import NewPostInput from "./Components/NewPostInput";
import Post from "./Components/Post";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState();
  const [userControls, setUserControls] = useState(false);

  //on page load retrieve data from db
  useEffect(() => {
    console.log("useEffect triggered");
    axios.get("/retrievePostData").then((response) => {
      console.log("data received");
      console.log(response.data);
      const data = response.data;
      //put retrieved data in proper format (with comments section)
      const newArray = [];
      for (let i = 0; i < data.length; i++) {
        newArray.push({
          id: data[i].post_id,
          title: data[i].title,
          content: data[i].content,
          comments: [{ name: data[i].name_, comment: data[i].comment }],
        });
      }
      console.log(newArray);
      //consolidate comments into each post
      let newArrayWithComments = [];
      console.log(newArray);
      for (let i = 0; i < newArray.length; i++) {
        if (newArrayWithComments.length === 0) {
          newArrayWithComments.push(newArray[i]);
          console.log("1");
        } else if (
          newArrayWithComments[newArrayWithComments.length - 1].id ===
          newArray[i].id
        ) {
          newArrayWithComments[newArrayWithComments.length - 1].comments.push({
            name: newArray[i].comments[0].name,
            comment: newArray[i].comments[0].comment,
          });
          console.log("2");
        } else {
          newArrayWithComments.push(newArray[i]);
          console.log("3");
        }
      }
      console.log(newArrayWithComments);
      //add to state
      setPosts(newArrayWithComments);
    });
  }, []);

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

  const activateUserControls = () => {
    setUserControls(!userControls);
  };

  const deletePost = (postId) => {
    axios
      .post("http://localhost:3000/deletePost", {
        postId: postId,
      })
      .then((res) => {
        console.log(`statusCode: ${res.status}`);
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header activateUserControls={activateUserControls} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NewPostInput
                  addNewPost={addNewPost}
                  userControls={userControls}
                />
                <PostsList
                  posts={posts}
                  updateSelectedPost={updateSelectedPost}
                  userControls={userControls}
                  deletePost={deletePost}
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
