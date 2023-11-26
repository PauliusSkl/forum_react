import React from "react";
import "../Styles/Comment.css";
import avatar from "../images/avatar.jpg";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateComment = ({ topicId, postId, onChange }) => {
  const [commentContent, setCommentContent] = useState("");

  const handleCommentSubmit = async () => {
    try {
      if (commentContent === "") {
        toast.error("Comment cannot be empty", {
          position: "top-center",
          autoClose: 1500,
          theme: "light",
        });
        return;
      }
      const accessToken = localStorage.getItem("accessToken");

      const response = await fetch(
        `https://walrus-app-2r2tj.ondigitalocean.app/api/topics/${topicId}/posts/${postId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            Content: commentContent,
          }),
        }
      );

      if (response.ok) {
        toast.success("Comment posted succsessfully!", {
          position: "top-center",
          autoClose: 1000,
          theme: "light",
        });
        onChange();
        setCommentContent("");
      } else {
        toast.error("You need to login to post a comment", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error posting comment", error);
    }
  };
  return (
    <>
      <div className="create_new_comment">
        <div className="user_avatar">
          <img src={avatar} alt="User Avatar" />
        </div>
        <div className="input_comment">
          <textarea
            type="text"
            placeholder="Join the conversation..."
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
        </div>
        <div className="comment_button">
          <button onClick={handleCommentSubmit}>
            <i className="fa fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateComment;
