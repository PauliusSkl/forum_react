import placeholderImage from "../images/placeholder-image.png";
import "../Styles/PostItem.css";
import { Link } from "react-router-dom";
import { handleDelete } from "../Utils/Delete";
const PostItem = (props) => {
  const idTopic = props.topic.id;
  const nameTopic = props.topic.name;
  const { id, name, creationDate } = props.post;

  const calculateTimeDifference = (creationDate) => {
    const now = new Date();
    const postDate = new Date(creationDate);

    const timeDifference = now - postDate;
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} ${days === 1 ? "day" : "days"} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    } else {
      return "just now";
    }
  };

  return (
    <div className="post">
      <div className="post_center">
        <img src={placeholderImage} alt="" />
      </div>
      <div className="post_right">
        <h3>
          <Link to={`/topics/${idTopic}/posts/${id}`}>{name}</Link>
        </h3>
        <span className="post_info">
          submitted {calculateTimeDifference(creationDate)} to{" "}
          <Link to={`/topics/${idTopic}`}> {nameTopic}</Link>
        </span>
        <div className="post_info">
          <span className="edit">edit |</span>
          <span
            className="delete"
            onClick={() => {
              handleDelete(
                `https://walrus-app-2r2tj.ondigitalocean.app/api/topics/${idTopic}/posts/`,
                id,
                `/topics/${idTopic}`
              );
            }}
          >
            delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
