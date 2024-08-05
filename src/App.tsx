import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPosts from "./components/ListPosts";
import UpdatePost from "./components/UpdatePost";
import type { Schema } from "../amplify/data/resource";
import { useState } from "react";

type Post = Schema["Post"]["type"];

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <Router>
      <main className="w-2/3 mx-auto">
        <Routes>
          <Route
            path="/"
            element={<ListPosts posts={posts} setPosts={setPosts} />}
          />
          <Route
            path="/edit/:id"
            element={<UpdatePost posts={posts} setPosts={setPosts} />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
