import "../Styles/Login.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EditTopic = ({ open, onClose, id }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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

  const handleTopicUpdate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      if (description === "") {
        setError("Please fill in all fields");
        return;
      }
      const response = await fetch(
        "https://walrus-app-2r2tj.ondigitalocean.app/api/topics/" + id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            Description: description,
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
        navigate("/topics/" + id + "?updated=true");
        navigate(0);
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
        <h2>Update Topic</h2>
        <form onSubmit={handleTopicUpdate}>
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
          <button type="submit">Update Topic</button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default EditTopic;