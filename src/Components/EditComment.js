import "../Styles/Login.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditComment = ({ open, onClose, id, idP, idC, onChange }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const updated = urlParams.get("updated");

    if (updated === "true") {
      toast.success("Topic updated!", {
        position: "top-center",
        autoClose: 1500,
        theme: "light",
      });
    }

    const url = new URL(window.location);
    url.searchParams.delete("updated");
    window.history.pushState({}, "", url);
  }, []);

  const handleCommentEdit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (description === "") {
        setError("Please fill in all fields");
        return;
      }
      const response = await fetch(
        "https://walrus-app-2r2tj.ondigitalocean.app/api/topics/" +
          id +
          "/posts/" +
          idP +
          "/comments/" +
          idC,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            Content: description,
          }),
        }
      );

      if (response.status === 401) {
        toast.error("You need to login to update!", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
        return;
      }

      if (response.status === 403) {
        toast.error("You are not allowed to update!", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
        return;
      }
      if (!response.ok) {
        const errorData = await response.text();
        setError(errorData);
      }

      if (response.ok) {
        toast.success("Comment updated!", {
          position: "top-center",
          autoClose: 1500,
          theme: "light",
        });
        onChange();
      }

      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!open) {
      setDescription("");
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className="overlay"></div>
      <div className="login-modal">
        <i className="fa fa-times close-button" onClick={onClose}></i>
        <h2>Update Comment</h2>
        <form onSubmit={handleCommentEdit}>
          <div className="input-group">
            <label>Description:</label>
            <textarea
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Update Comment</button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditComment;
