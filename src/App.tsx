import AddPost from "./components/AddPost";
import ListPosts from "./components/ListPosts";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../amplify/data/resource";
import { useEffect } from "react";

const client = generateClient<Schema>();

function App() {
  useEffect(() => {
    const callEcho = async () => {
      try {
        await client.queries.echo({ content: "Hello, world!" });
      } catch (error) {
        console.error(error);
      }
    };

    callEcho();
  }, []);

  return (
    <main>
      <ListPosts />
      <AddPost />
    </main>
  );
}

export default App;
