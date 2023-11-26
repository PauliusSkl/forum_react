import React from "react";
import "../Styles/PostData.css";
import { calculateTimeDifference } from "../Utils/calculateTimeDifference";
import { Link } from "react-router-dom";
import test from "../images/Test.jpg";
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
      <div className="postHeader">
        <img src={test} alt="Post" className="postImage" />
      </div>

      <p>{body}</p>
    </div>
  );
};

export default PostData;
