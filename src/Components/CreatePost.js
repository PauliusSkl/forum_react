import "../Styles/Login.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
const CreatePost = ({ open, onClose, id }) => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handlePostCreate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "https://walrus-app-2r2tj.ondigitalocean.app/api/topics/" +
          id +
          "/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            Name: name,
            Body: body,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        setError(errorData);
      } else {
        const data = await response.json();
        console.log("API Response:", data);
      }
      window.location.href = "/topics/" + id;
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!open) {
      setName("");
      setBody("");
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay"></div>
      <div className="login-modal">
        <i className="fa fa-times close-button" onClick={onClose}></i>
        <h2>Create New Post</h2>
        <form onSubmit={handlePostCreate}>
          <div className="input-group">
            <label>Post name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Post Body:</label>
            <textarea
              type="text"
              name="description"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Create Post</button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default CreatePost;
