import "../Styles/Login.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
const CreateTopic = ({ open, onClose, onChange }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);

  const handleTopicCreate = async (e) => {
    e.preventDefault();
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

      if (!response.ok) {
        const errorData = await response.text();
        setError(errorData);
      } else {
        const data = await response.json();
        console.log("API Response:", data);
      }
      onChange();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!open) {
      setName("");
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
          <button type="submit">Create Topic</button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default CreateTopic;
