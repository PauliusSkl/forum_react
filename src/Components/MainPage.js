import Posts from "./Posts";
import "../Styles/Main.css";
import HeaderWithFunctionality from "./HeaderWithFunctionality";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
const MainPage = ({ onChange }) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const deleted = urlParams.get("deleted");

    if (deleted) {
      toast.success("Topic deleted successfully!", {
        toastId: "topicDeleted",
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
    const url = new URL(window.location);
    url.searchParams.delete("deleted");
    window.history.pushState({}, "", url);
  }, []);
  return (
    <>
      <div className="main">
        <HeaderWithFunctionality onChange={onChange} />
        <Posts />
        <ToastContainer />
      </div>
    </>
  );
};

export default MainPage;
