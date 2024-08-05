import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPosts from "./components/ListPosts";
import UpdatePost from "./components/UpdatePost";
import type { Schema } from "../amplify/data/resource";
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";

type Post = Schema["Post"]["type"];

const client = generateClient<Schema>();

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await client.queries.listPosts();
        console.log("listPosts", data);
        if (data && data.items) {
          const filteredPosts = data.items.filter(
            (post) => post !== null && post !== undefined
          ) as Post[];
          setPosts(filteredPosts);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred."));
        }
      }
    };

    fetchPosts();
  }, []);

  return (
    <Router>
      <main className="w-2/3 mx-auto">
        {error ? (
          <div className="text-red-500">{error.message}</div>
        ) : loading ? (
          <div>Loading...</div>
        ) : (
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
        )}
      </main>
    </Router>
  );
}

export default App;
