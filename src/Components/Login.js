import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "../Styles/Login.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://walrus-app-2r2tj.ondigitalocean.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }

      const data = await response.json();

      localStorage.setItem("accessToken", data.accessToken);
      onClose();
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setUsername("");
      setPassword("");
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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Username:</label>
            <input
              type="text"
              name="userName"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                Logging in <span className="spinner" />
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Login;
