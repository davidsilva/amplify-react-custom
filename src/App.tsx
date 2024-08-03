import AddPost from "./components/AddPost";
import ListPosts from "./components/ListPosts";
import type { Schema } from "../amplify/data/resource";
import { useState } from "react";

type Post = Schema["Post"]["type"];

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <main className="w-2/3 mx-auto">
      <ListPosts posts={posts} setPosts={setPosts} />
      <AddPost posts={posts} setPosts={setPosts} />
    </main>
  );
}

export default App;
