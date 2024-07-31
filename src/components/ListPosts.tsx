import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

type Post = Schema["Post"]["type"];

const ListPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const allPostResult = await client.queries.allPost();
        console.log("allPostResult", allPostResult);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const getOnePost = async () => {
      try {
        const getPostResult = await client.queries.getPost({
          id: "fa99cf82-4ef9-4b89-8c3d-0c0881e35fb2",
        });
        console.log("getPostResult", getPostResult);
      } catch (error) {
        console.error(error);
      }
    };

    getOnePost();
  }, []);

  return <div>ListPosts</div>;
};
export default ListPosts;
