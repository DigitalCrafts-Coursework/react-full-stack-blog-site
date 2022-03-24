import React from "react";

export default function Header(props) {
  return (
    <div>
      <div>Welcome to my blog site!</div>
      <button className="edit-button" onClick={props.activateUserControls}>
        Enable edits
      </button>
    </div>
  );
}
