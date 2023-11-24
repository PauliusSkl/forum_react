import React from "react";
import "../Styles/PostData.css";
import { calculateTimeDifference } from "../Utils/calculateTimeDifference";
import { Link } from "react-router-dom";
const PostData = ({ name, body, topicName, topicId, postedTime }) => {
  return (
    <div className="postData">
      <div className="topicInfo">
        <Link to={`/topics/${topicId}`} className="topicLink">
          /{topicName}
        </Link>
        <span className="postedTime">
          {calculateTimeDifference(postedTime)}
        </span>
      </div>
      <h1>{name}</h1>
      <p>{body}</p>
      <div className="iconContainer">
        <i className="fas fa-save"></i>
        <i className="fas fa-trash"></i>
      </div>
    </div>
  );
};

export default PostData;
