import "../Styles/SideNav.css";
import redditLogo from "../images/Reddit-Logo.png";
import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";
const SideNav = () => {
  const [selectedTopic, setSelectedTopic] = useState(-1);
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  const menus = [{ to: "/", text: "All" }];

  const {
    data: topics,
    error,
    loading,
  } = useFetch("https://walrus-app-2r2tj.ondigitalocean.app/api/topics");

  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId);
  };

  const toggleSideNavVisibility = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  const emptyTopic = { id: "empty", name: "" };
  return (
    <>
      <button onClick={toggleSideNavVisibility} className="toggle-button">
        <i className="fa fa-bars"></i>
      </button>
      <div className={`sidenav ${isSideNavVisible ? "show" : ""}`}>
        <div className="sidenav_logo">
          <img src={redditLogo} alt="forum-logo" />
        </div>
        <div className="sidenav_search">
          <input type="text" name="search" placeholder="Search" />
          <i className="fas fa-search"></i>
        </div>
        <div className="sidenav_link">
          <ul className="sidenav_menu">
            {menus.map((menu) => (
              <li
                onClick={() => {
                  handleTopicClick(-1);
                  toggleSideNavVisibility();
                }}
                key={menu.to}
              >
                <Link
                  className={selectedTopic === -1 ? "highlighted" : ""}
                  to={`${menu.to}`}
                >
                  {menu.text}
                </Link>
              </li>
            ))}
          </ul>
          <hr />
          {error && <div>{error}</div>}
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <ul className="sidenav_subreddit">
              {[...topics, emptyTopic].map((topic) => (
                <li
                  key={topic.id}
                  onClick={() => {
                    handleTopicClick(topic.id);
                    toggleSideNavVisibility();
                  }}
                >
                  <Link
                    className={selectedTopic === topic.id ? "highlighted" : ""}
                    to={`/topics/${topic.id}`}
                  >
                    {topic.name.length > 15
                      ? `${topic.name.slice(0, 15)}...`
                      : topic.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SideNav;
