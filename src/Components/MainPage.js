import React, { useEffect, useState } from "react";
import PostsAll from "./PostsAll";
import "../Styles/Main.css";
import HeaderWithFunctionality from "./HeaderWithFunctionality";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = ({ onChange }) => {
  const [topicsWithPosts, setTopicsWithPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topicsResponse = await fetch(
          "https://walrus-app-2r2tj.ondigitalocean.app/api/topics?pageSize=50"
        );
        if (!topicsResponse.ok) {
          throw new Error("Failed to fetch topics");
        }
        const topicsData = await topicsResponse.json();

        const topicsWithPostsData = await Promise.all(
          topicsData.map(async (topic) => {
            const postsResponse = await fetch(
              `https://walrus-app-2r2tj.ondigitalocean.app/api/topics/${topic.id}/posts?pageSize=50`
            );
            if (!postsResponse.ok) {
              throw new Error(`Failed to fetch posts for topic ${topic.id}`);
            }
            const postsData = await postsResponse.json();

            return {
              ...topic,
              posts: postsData.map((post) => ({
                ...post,
                topicId: topic.id,
              })),
            };
          })
        );

        setTopicsWithPosts(topicsWithPostsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const deleted = urlParams.get("deleted");

    if (deleted) {
      toast.success("Topic deleted successfully!", {
        toastId: "topicDeleted",
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
  }, []);

  return (
    <>
      <div className="main">
        <HeaderWithFunctionality onChange={onChange} />
        {loading ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          <>
            <PostsAll topicsWithPosts={topicsWithPosts} />
            <ToastContainer />
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;
