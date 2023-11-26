import "../Styles/Login.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CreateTopic = ({ open, onClose, onChange }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicCreate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (name === "" || description === "") {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "https://walrus-app-2r2tj.ondigitalocean.app/api/topics",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            Name: name,
            Description: description,
          }),
        }
      );

      if (response.status === 401) {
        toast.error("You need to login to create a topic!", {
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
        toast.success("Topic created!", {
          position: "top-center",
          autoClose: 1500,
          theme: "light",
        });
        onChange();
      }

      onClose();
    } catch (error) {
      setError("Error creating topic");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
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
        <h2>Create New Topic</h2>
        <form onSubmit={handleTopicCreate}>
          <div className="input-group">
            <label>Topic name:</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
                Creating Topic <span className="spinner" />
              </>
            ) : (
              "Create Topic"
            )}
          </button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default CreateTopic;
