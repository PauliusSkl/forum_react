import "./App.css";
import SideNav from "./Components/SideNav";
import PostPage from "./Components/PostPage";
import MainPage from "./Components/MainPage";
import PostBody from "./Components/PostBody";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };
  return (
    <Router>
      <div className="App">
        <div className="container">
          <SideNav key={seed} />
          <Routes>
            <Route path="/" element={<MainPage onChange={reset} />}></Route>
            <Route
              path="/topics/:id"
              element={<PostPage onChange={reset} />}
            ></Route>
            <Route
              path="/topics/:id/posts/:pid"
              element={<PostBody onChange={reset} />}
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
