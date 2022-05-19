import React from "react";

const Comments = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No comments yet</h3>;
  }

  return (
    <>
      <h3>Comments</h3>
      <div>
        {comments &&
          comments.map((comment) => (
            <div key={comment._id}>
              <h5>{comment.commentAuthor} commented </h5>
              <p>{comment.commentText}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Comments;
