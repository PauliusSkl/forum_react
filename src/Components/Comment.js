import avatar from "../images/avatar.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import EditComment from "./EditComment";
const formatDateTime = (isoDate) => {
  const optionsDate = { year: "numeric", month: "2-digit", day: "2-digit" };
  const optionsTime = { hour: "2-digit", minute: "2-digit" };

  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString("en-GB", optionsDate);
  const formattedTime = date.toLocaleTimeString("en-GB", optionsTime);

  return {
    formattedDate,
    formattedTime,
  };
};

const Comment = ({ topicId, postId, comment, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { formattedDate, formattedTime } = formatDateTime(comment.creationDate);
  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (isConfirmed) {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await fetch(
          `https://walrus-app-2r2tj.ondigitalocean.app/api/topics/${topicId}/posts/${postId}/comments/${comment.id}`,

          {
            method: "DELETE",

            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 403) {
          toast.error("Only comment creator can delete this comment!", {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
          });
          return;
        }

        if (response.status === 401) {
          toast.error("You need to login to delete this comment!", {
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
          toast.success("Comment deleted!", {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
          });
          onChange();
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
      <div className="new_comment">
        <ul className="user_comment">
          <div className="user_avatar">
            <img src={avatar} alt="logo" />
          </div>
          <div className="comment_body">
            <p>{comment.content}</p>
          </div>

          <div className="comment_toolbar">
            <div className="comment_details">
              <ul>
                <li>
                  <i className="fa fa-clock-o"></i> {formattedTime}
                </li>
                <li>
                  <i className="fa fa-calendar"></i> {formattedDate}
                </li>
                <li>
                  <i className="fa fa-pencil"></i>{" "}
                  <span className="user">Paulius</span>
                </li>
              </ul>
            </div>
            <div className="comment_tools">
              <ul>
                <li>
                  <i
                    className="fas fa-edit"
                    onClick={() => setIsOpen(true)}
                  ></i>
                </li>
                <li>
                  <i className="fas fa-trash-alt" onClick={handleDelete}></i>
                </li>
              </ul>
            </div>
          </div>
        </ul>
      </div>
      <EditComment
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        idC={comment.id}
        onChange={onChange}
        id={topicId}
        idP={postId}
        body={comment.content}
      />
    </>
  );
};

export default Comment;
