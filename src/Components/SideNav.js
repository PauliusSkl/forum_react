import "../Styles/SideNav.css";
import redditLogo from "../images/Reddit-Logo.png";
import useFetch from "../Hooks/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";
const SideNav = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const menus = [
    { to: "55", text: "Popular" },
    { to: "56", text: "All" },
    { to: "57", text: "Random" },
  ];

  const {
    data: topics,
    error,
    loading,
  } = useFetch("https://walrus-app-2r2tj.ondigitalocean.app/api/topics/");

  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId);
  };

  return (
    <div className="sidenav">
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
            <li key={menu.to}>
              <a href="/xd">{menu.text}</a>
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
          <>
            <ul className="sidenav_subreddit">
              {topics.map((topic) => (
                <Link to={`/topics/${topic.id}`} key={topic.id}>
                  <li
                    onClick={() => handleTopicClick(topic.id)}
                    className={selectedTopic === topic.id ? "highlighted" : ""}
                  >
                    {topic.name}
                  </li>
                </Link>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SideNav;
