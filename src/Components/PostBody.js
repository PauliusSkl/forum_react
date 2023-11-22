import HeaderWithFunctionality from "./HeaderWithFunctionality";
import "../Styles/PostBody.css";
import "../Styles/Main.css";
const PostBody = ({ id, pid }) => {
  return (
    <div className="main">
      <HeaderWithFunctionality />
      <div className="postBody">test</div>
    </div>
  );
};

export default PostBody;
