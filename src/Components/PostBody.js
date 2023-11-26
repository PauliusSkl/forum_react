import HeaderWithFunctionality from "./HeaderWithFunctionality";
import CommentSection from "./CoomentSection";
import "../Styles/PostBody.css";
import "../Styles/Main.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import PostData from "./PostData";
import useFetch from "../Hooks/useFetch";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PostBody = ({ onChange }) => {
  const { id, pid } = useParams();
  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };

  const {
    data: topic,
    error: errorTopic,
    loading: loadingTopic,
  } = useFetch("https://walrus-app-2r2tj.ondigitalocean.app/api/topics/" + id);

  const {
    data: post,
    error,
    loading,
  } = useFetch(
    "https://walrus-app-2r2tj.ondigitalocean.app/api/topics/" +
      id +
      "/posts/" +
      pid
  );

  return (
    <>
      <div className="main">
        <HeaderWithFunctionality onChange={onChange} />
        <div className="postBody">
          {error && <div>{error}</div>}
          {errorTopic && <div>{errorTopic}</div>}
          {loading || loadingTopic ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              <PostData
                name={post.resource.name}
                body={post.resource.body}
                topicName={topic.resource.name}
                topicId={id}
                postedTime={post.resource.creationDate}
              />
            </>
          )}
          <hr />
          <CommentSection
            key={seed}
            onChange={reset}
            topicId={id}
            postId={pid}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostBody;
