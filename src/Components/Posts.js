import PostItem from "./PostItem";
import "../Styles/Posts.css";
const Posts = (props) => {
  const posts = props.data || [];
  const topic = props.topic || [];
  return (
    <div className="posts">
      {posts.map((posts) => (
        <PostItem key={posts.id} post={posts} topic={topic} />
      ))}
    </div>
  );
};

export default Posts;
