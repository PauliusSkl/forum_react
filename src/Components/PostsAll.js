import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import "../Styles/Posts.css";
import { useLocation } from "react-router-dom";

const PostsAll = ({ topicsWithPosts }) => {
  const [filter, setFilter] = useState("new");
  const location = useLocation();

  useEffect(() => {
    const urlFilter = new URLSearchParams(location.search).get("filter");
    if (urlFilter) {
      setFilter(urlFilter);
    }
  }, [location.search]);

  const filterPosts = (posts, filter) => {
    switch (filter) {
      case "popularas":
        return posts;
      case "new":
        return posts.sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );
      case "old":
        return posts.sort(
          (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
        );
      default:
        return posts.sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );
    }
  };

  return (
    <div className="posts">
      {topicsWithPosts.map((topicWithPosts) =>
        filterPosts(topicWithPosts.posts, filter).map((post) => (
          <PostItem key={post.id} post={post} topic={topicWithPosts} />
        ))
      )}
    </div>
  );
};

export default PostsAll;
