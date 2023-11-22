import Posts from "./Posts";
import "../Styles/Main.css";
import HeaderWithFunctionality from "./HeaderWithFunctionality";

const MainPage = () => {
  return (
    <div className="main">
      <HeaderWithFunctionality />
      <Posts />
    </div>
  );
};

export default MainPage;
