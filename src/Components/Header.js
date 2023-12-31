import React from "react";
import { Link, useLocation } from "react-router-dom";
import avatar from "../images/avatar.jpg";
import "../Styles/Header.css";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = ({ openLogin, openRegister, openCreateTopic }) => {
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const addFilterToUrl = (filter) => {
    const currentPath = location.pathname;
    const currentSearch = location.search;
    const withoutFilter = currentSearch.replace(/([?&])filter=[^&]*(&)?/, "$2");
    const newUrl = `${currentPath}${
      withoutFilter ? withoutFilter + "&" : "?"
    }filter=${filter}`;

    return newUrl;
  };

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);

        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({
            name: decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
            expirationDate: new Date(decodedToken.exp * 1000),
          });
        } else {
          localStorage.removeItem("accessToken");
          setUser(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("accessToken");
        setUser(null);
      }
    }
  }, [accessToken]);

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    setIsDropdownOpen(false);
    toast.success("You have been signed out!", {
      position: "top-center",
      autoClose: 1500,
      theme: "light",
    });
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };
  const getFilterFromUrl = () => {
    const urlParams = new URLSearchParams(location.search);
    return urlParams.get("filter");
  };
  return (
    <div className="header">
      <div className="header_left">
        <ul>
          <li>
            <Link
              to={addFilterToUrl("popular")}
              className={getFilterFromUrl() === "popular" ? "active" : ""}
            >
              Popular
            </Link>
          </li>
          <li>
            <Link
              to={addFilterToUrl("new")}
              className={
                !getFilterFromUrl() || getFilterFromUrl() === "new"
                  ? "active"
                  : ""
              }
            >
              New
            </Link>
          </li>
          <li>
            <Link
              to={addFilterToUrl("old")}
              className={getFilterFromUrl() === "old" ? "active" : ""}
            >
              Old
            </Link>
          </li>
        </ul>
      </div>
      <div className="header_right">
        {user ? (
          <>
            <img src={avatar} alt="" />
            <div className="header_user" onClick={handleDropdownClick}>
              <span>{user.name}</span>
              <i
                className={`fas fa-caret-down ${isDropdownOpen ? "open" : ""}`}
              ></i>
              {isDropdownOpen && (
                <div className="dropdown-content">
                  <button className="sign-out-btn" onClick={openCreateTopic}>
                    Create Topic
                  </button>
                  <button className="sign-out-btn" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <button className="login-btn" onClick={openLogin}>
              Login
            </button>
            <button className="signin-btn" onClick={openRegister}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
