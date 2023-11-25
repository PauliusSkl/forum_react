import Posts from "./Posts";
import "../Styles/Main.css";
import HeaderWithFunctionality from "./HeaderWithFunctionality";

const MainPage = ({ onChange }) => {
  return (
    <div className="main">
      <HeaderWithFunctionality onChange={onChange} />
      <Posts />
    </div>
  );
};

export default MainPage;
