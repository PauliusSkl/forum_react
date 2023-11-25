import Posts from "./Posts";
import "../Styles/Main.css";
import { useParams } from "react-router-dom";
import useFetch from "../Hooks/useFetch";
import { useLocation } from "react-router-dom";
import HeaderWithFunctionality from "./HeaderWithFunctionality";
import TopicData from "./TopicData";
const PostPage = ({ onChange }) => {
  const { id } = useParams();
  const { search } = useLocation();
  const filter = new URLSearchParams(search).get("filter");
  const filterPosts = (posts, filter) => {
    switch (filter) {
      case "popularas":
        return posts.sort((a, b) => b.commentCount - a.commentCount);
      case "new":
        return posts.sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );
      case "old":
        return posts.sort(
          (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
        );
      default:
        return posts;
    }
  };
  const {
    data: topic,
    errorTopic,
    loadingTopic,
  } = useFetch("https://walrus-app-2r2tj.ondigitalocean.app/api/topics/" + id);

  const {
    data: posts,
    error,
    loading,
  } = useFetch(
    "https://walrus-app-2r2tj.ondigitalocean.app/api/topics/" + id + "/posts"
  );

  const filteredPosts = filterPosts(posts, filter);

  return (
    <div className="main">
      <HeaderWithFunctionality onChange={onChange} />
      {error && <div>{error}</div>}
      {errorTopic && <div>{errorTopic}</div>}
      {loading || loadingTopic ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {topic.resource ? ( // Check if topic.resource is defined
            <>
              <TopicData
                description={topic.resource.description}
                topicId={id}
              />
              <Posts data={filteredPosts} topic={topic.resource} />
            </>
          ) : (
            <div>Topic data not available.</div>
          )}
        </>
      )}
    </div>
  );
};

export default PostPage;
