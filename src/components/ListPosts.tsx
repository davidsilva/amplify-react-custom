import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";

const client = generateClient<Schema>();

type Post = Schema["Post"]["type"];

type ListPostsProps = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const ListPosts = ({ posts, setPosts }: ListPostsProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());

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

  const handleCheckboxChange = (postId: string) => {
    setSelectedPosts((prevSelectedPosts) => {
      const newSelectedPosts = new Set(prevSelectedPosts);
      if (newSelectedPosts.has(postId)) {
        newSelectedPosts.delete(postId);
      } else {
        newSelectedPosts.add(postId);
      }
      return newSelectedPosts;
    });
  };

  const handleDelete = async () => {
    try {
      const batchDeletePostsResult = await client.mutations.batchDeletePosts({
        ids: Array.from(selectedPosts),
      });
      console.log("batchDeletePostsResult", batchDeletePostsResult);
      // batchDeletePostsResult.data?.items is an array ids that have been deleted
      // batchDeletePostsResult.data?.unprocessedKeys is an array of ids that were not deleted
      if (batchDeletePostsResult.data?.items) {
        const deletedIds = batchDeletePostsResult.data.items.filter(
          (item) => item !== null && item !== undefined
        );
        setPosts((prevPosts) => {
          return prevPosts.filter((post) => !deletedIds.includes(post.id));
        });
      }

      setSelectedPosts(new Set());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("selectedPosts", selectedPosts);
  }, [selectedPosts]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold">List of Posts</h1>
      <p>Count of Posts: {posts.length}</p>
      {posts.map((post) => (
        <div key={post.id} className="my-1 border rounded-md border-black p-1">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
          <p>URL: {post.url}</p>
          <p>Ups: {post.ups}</p>
          <p>Downs: {post.downs}</p>
          <p>Version: {post.version}</p>
          <div>
            <input
              type="checkbox"
              checked={selectedPosts.has(post.id)}
              onChange={() => handleCheckboxChange(post.id)}
            />
            <label htmlFor="selectedPosts">Select for Delete</label>
          </div>
        </div>
      ))}
      <div>
        <button
          onClick={handleDelete}
          className="p-1 border rounded-md border-black"
        >
          Delete Selected Posts
        </button>
      </div>
    </>
  );
};
export default ListPosts;
