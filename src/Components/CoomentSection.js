import "../Styles/Comment.css";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import useFetch from "../Hooks/useFetch";

const CommentSection = ({ topicId, onChange, postId }) => {
  const {
    data: commentsData,
    error,
    loading,
  } = useFetch(
    `https://walrus-app-2r2tj.ondigitalocean.app/api/topics/${topicId}/posts/${postId}/comments`
  );
  const sortedComments = commentsData?.slice().sort((a, b) => {
    const dateA = new Date(a.creationDate);
    const dateB = new Date(b.creationDate);
    return dateB - dateA;
  });
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
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CommentSection;
