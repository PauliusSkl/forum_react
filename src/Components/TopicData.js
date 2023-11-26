import React from "react";
import "../Styles/TopicData.css";
import { useState } from "react";
import CreatePost from "./CreatePost";
import EditTopic from "./EditTopic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TopicData = ({ topicId, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const handleDelete = async (url, id, path) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this topic?"
    );

    if (isConfirmed) {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(`${url}${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 403) {
          toast.error("Only topic creator can delete this topic!", {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
          });
          return;
        }
        if (response.status === 401) {
          toast.error("You need to login to delete this topic!", {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
          });
          return;
        }
        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData);
        }

        window.location.href = path + "?deleted=true";
      } catch (error) {
        toast.error("Error deleting", {
          position: "top-center",
          autoClose: 2000,
          theme: "light",
        });
      }
    }
  };
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
        body={description}
        id={topicId}
      />
      <ToastContainer />
    </>
  );
};

export default TopicData;
