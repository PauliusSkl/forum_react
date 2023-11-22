import "./App.css";
import SideNav from "./Components/SideNav";
import PostPage from "./Components/PostPage";
import MainPage from "./Components/MainPage";
import PostBody from "./Components/PostBody";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <SideNav />
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/topics/:id" element={<PostPage />}></Route>
            <Route path="/topics/:id/posts/:pid" element={<PostBody />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
