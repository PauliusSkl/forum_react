import "../Styles/Comment.css";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import useFetch from "../Hooks/useFetch";
import { useLocation } from "react-router-dom";
const CommentSection = ({ topicId, onChange, postId }) => {
  const { search } = useLocation();
  const filter = new URLSearchParams(search).get("filter");
  const filterComments = (comments, filter) => {
    switch (filter) {
      case "popularas":
        return comments;
      case "new":
        return comments.sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );
      case "old":
        return comments.sort(
          (a, b) => new Date(a.creationDate) - new Date(b.creationDate)
        );
      default:
        return comments.sort(
          (a, b) => new Date(b.creationDate) - new Date(a.creationDate)
        );
    }
  };
  const {
    data: commentsData,
    error,
    loading,
  } = useFetch(
    `https://walrus-app-2r2tj.ondigitalocean.app/api/topics/${topicId}/posts/${postId}/comments`
  );
  const sortedComments = filterComments(commentsData, filter);
  return (
    <>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="comment_block">
            <CreateComment
              topicId={topicId}
              postId={postId}
              onChange={onChange}
            />
            {sortedComments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                topicId={topicId}
                postId={postId}
                onChange={onChange}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CommentSection;
