import React, { useEffect, useState } from "react";

export default function Post(props) {
  const { title, content, comments } = props.selectedPost;

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // useEffect(() => {
  //   console.log("comment submitted");
  // }, [commentSubmitted]);

  const commentElements = comments.map((comment) => {
    return (
      <div key={Math.floor(Math.random() * 10000)}>
        <span>{comment.name} </span>
        <span>{comment.comment}</span>
      </div>
    );
  });

  const handleClick = () => {
    setDropdownVisibility(!dropdownVisibility);
  };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    console.log(newComment);
    setNewComment({ ...newComment, [inputName]: inputValue });
    console.log(newComment);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateComments(newComment);
    setCommentSubmitted(!commentSubmitted);
  };

  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>
      <button className="comments-button" onClick={handleClick}>
        See comments
      </button>
      {dropdownVisibility && (
        <div className="transition-div">
          <div>{commentElements}</div>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                value={newComment.name}
                name="name"
                id="name"
                type="text"
                onChange={handleChange}
              />
              <label htmlFor="comment">Comment</label>
              <input
                value={newComment.comment}
                name="comment"
                id="comment"
                type="text"
                onChange={handleChange}
              />
              <button>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
