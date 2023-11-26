import placeholderImage from "../images/placeholder-image.png";
import "../Styles/PostItem.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useState } from "react";
import EditPost from "./EditPost";
const PostItem = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const idTopic = props.topic.id;
  const nameTopic = props.topic.name;
  const { id, name, creationDate } = props.post;
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const deleted = urlParams.get("deleted");

    if (deleted === "true") {
      toast.success("Post deleted!", {
        position: "top-center",
        autoClose: 1500,
        theme: "light",
        toastId: "deletedPost",
      });
    }
  }, []);

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
  const handleDelete = async (url, id, path) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
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
          toast.error("Only post creator can delete this post!", {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
          });
          return;
        }
        if (response.status === 401) {
          toast.error("You need to login to delete this post!", {
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

        if (response.ok) {
          toast.success("Post deleted!", {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
          });
          window.location.href = path + "?deleted=true";
        }
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
            <span className="edit" onClick={() => setIsOpened(true)}>
              edit |
            </span>
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
      <EditPost
        open={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
        body={props.post.body}
        id={idTopic}
        idP={id}
      />
    </>
  );
};

export default PostItem;
