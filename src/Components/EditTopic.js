import "../Styles/Login.css";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
const EditTopic = ({ open, onClose, id }) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleTopicUpdate = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
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

      if (!response.ok) {
        const errorData = await response.text();
        setError(errorData);
      }
      onClose();
      navigate(0);
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
