import React, { useEffect, useState } from "react";

export default function Post(props) {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [newComment, setNewComment] = useState({ name: "", comment: "" });

  const { title, content, comments } = props.selectedPost;

  useEffect(() => {
    console.log("props updated");
  }, [props.selectedPost]);

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
    setNewComment({ ...newComment, [inputName]: inputValue });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateComments(newComment);
  };

  return (
    <div>
      <div>{title}</div>
      <div>{content}</div>
      <button className="comments-button" onClick={handleClick}>
        See comments
      </button>
      {dropdownVisibility && (
        <div>
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
