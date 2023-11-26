import "../Styles/Login.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditComment = ({ open, onClose, body, id, idP, idC, onChange }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentEdit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (description === "") {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    if (description === body) {
      setError("You need to change the comment to update!");
      setIsLoading(false);
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    try {
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setDescription(body);
      setError(null);
      setIsLoading(false);
    }
  }, [open, body]);

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
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                Updating <span className="spinner" />
              </>
            ) : (
              "Update Comment"
            )}
          </button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditComment;
