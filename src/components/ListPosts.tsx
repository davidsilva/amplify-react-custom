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
  const [postsToDelete, setPostsToDelete] = useState<Set<string>>(new Set());
  const [postsToGet, setPostsToGet] = useState<Set<string>>(new Set());
  const [postsToArchive, setPostsToArchive] = useState<Set<string>>(new Set());

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

  const handleSelectForDelete = (postId: string) => {
    setPostsToDelete((prevPostsToDelete) => {
      const newSelectedPosts = new Set(prevPostsToDelete);
      if (newSelectedPosts.has(postId)) {
        newSelectedPosts.delete(postId);
      } else {
        newSelectedPosts.add(postId);
      }
      return newSelectedPosts;
    });
  };

  const handleSelectForGet = (postId: string) => {
    setPostsToGet((prevPostsToGet) => {
      const newSelectedPosts = new Set(prevPostsToGet);
      if (newSelectedPosts.has(postId)) {
        newSelectedPosts.delete(postId);
      } else {
        newSelectedPosts.add(postId);
      }
      return newSelectedPosts;
    });
  };

  const handleSelectForArchive = (postId: string) => {
    setPostsToArchive((prevPostsToArchive) => {
      const newSelectedPosts = new Set(prevPostsToArchive);
      if (newSelectedPosts.has(postId)) {
        newSelectedPosts.delete(postId);
      } else {
        newSelectedPosts.add(postId);
      }
      return newSelectedPosts;
    });
  };

  const handleBatchArchive = async () => {
    try {
      const batchArchivePostsResult = await client.mutations.batchArchivePosts({
        ids: Array.from(postsToArchive),
      });
      console.log("batchArchivePostsResult", batchArchivePostsResult);
      // batchArchivePostsResult.data?.items is an array of posts that were archived
      // batchArchivePostsResult.data?.unprocessedKeys is an array of ids that were not archived
      if (batchArchivePostsResult.data?.items) {
        const archivedPosts = batchArchivePostsResult.data.items.filter(
          (item) => item !== null && item !== undefined
        ) as Post[];
        setPosts((prevPosts) => {
          return prevPosts.map((post) => {
            if (
              archivedPosts.some((archivedPost) => archivedPost.id === post.id)
            ) {
              return { ...post, isArchived: true };
            }
            return post;
          });
        });
      }

      setPostsToArchive(new Set());
    } catch (error) {
      console.error(error);
    }
  };

  const handleBatchDelete = async () => {
    try {
      const batchDeletePostsResult = await client.mutations.batchDeletePosts({
        ids: Array.from(postsToDelete),
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

      setPostsToDelete(new Set());
    } catch (error) {
      console.error(error);
    }
  };

  const handleBatchGet = async () => {
    try {
      const batchGetPostsResult = await client.queries.batchGetPosts({
        ids: Array.from(postsToGet),
      });
      console.log("batchGetPostsResult", batchGetPostsResult);
      // batchGetPostsResult.data?.items is an array of posts that were retrieved
      // batchGetPostsResult.data?.unprocessedKeys is an array of ids that were not retrieved
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("selectedPosts", postsToDelete);
  }, [postsToDelete]);

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
          <p>Is Archived: {post.isArchived ? "Yes" : "No"}</p>
          <div className="flex">
            <div>
              <input
                type="checkbox"
                checked={postsToDelete.has(post.id)}
                onChange={() => handleSelectForDelete(post.id)}
              />
              <label>Select for Delete</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={postsToGet.has(post.id)}
                onChange={() => handleSelectForGet(post.id)}
              />
              <label>Select for Get</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={postsToArchive.has(post.id)}
                onChange={() => handleSelectForArchive(post.id)}
              />
              <label>Select for Archive</label>
            </div>
          </div>
        </div>
      ))}
      <div className="flex">
        <div>
          <button
            onClick={handleBatchDelete}
            className="p-1 border rounded-md border-black"
          >
            Delete Selected Posts
          </button>
        </div>
        <div>
          <button
            onClick={handleBatchGet}
            className="p-1 border rounded-md border-black"
          >
            Get Selected Posts
          </button>
        </div>
        <div>
          <button
            onClick={handleBatchArchive}
            className="p-1 border rounded-md border-black"
          >
            Archive Selected Posts
          </button>
        </div>
      </div>
    </>
  );
};
export default ListPosts;
