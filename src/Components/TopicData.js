import React from "react";
import "../Styles/TopicData.css";
import { useState } from "react";
import CreatePost from "./CreatePost";
import { handleDelete } from "../Utils/Delete";
import EditTopic from "./EditTopic";
const TopicData = ({ topicId, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  return (
    <>
      <div className="topicData">
        <h1>{description}</h1>
        <div className="iconContainer">
          <i className="fas fa-edit" onClick={() => setIsOpenEdit(true)}></i>
          <i
            className="fas fa-trash"
            onClick={() => {
              handleDelete(
                "https://walrus-app-2r2tj.ondigitalocean.app/api/topics/",
                topicId,
                "/"
              );
            }}
          ></i>
          <i className="fas fa-plus" onClick={() => setIsOpen(true)}></i>
        </div>
      </div>
      <CreatePost
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        id={topicId}
      />
      <EditTopic
        open={isOpenEdit}
        onClose={() => {
          setIsOpenEdit(false);
        }}
        id={topicId}
      />
    </>
  );
};

export default TopicData;
