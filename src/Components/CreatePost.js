import "../Styles/Login.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreatePost = ({ open, onClose, id }) => {
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const created = urlParams.get("created");

    if (created === "true") {
      toast.success("Post created!", {
        position: "top-center",
        autoClose: 1500,
        theme: "light",
        toastId: "createdPost",
      });
    }
  }, []);

  const handlePostCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name === "" || body === "") {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
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

      if (response.status === 401) {
        toast.error("You need to login to post!", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
        return;
      }
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      if (response.ok) {
        navigate("/topics/" + id + "?created=true");
        navigate(0);
      }

      onClose();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setName("");
      setBody("");
      setError(null);
      setIsLoading(false);
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                Creating post <span className="spinner" />
              </>
            ) : (
              "Create Post"
            )}
          </button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default CreatePost;
