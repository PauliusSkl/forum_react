import avatar from "../images/avatar.jpg";
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

const Comment = ({ comment }) => {
  const { formattedDate, formattedTime } = formatDateTime(comment.creationDate);
  return (
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
                <i className="fas fa-edit"></i>
              </li>
              <li>
                <i className="fas fa-trash-alt"></i>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Comment;
