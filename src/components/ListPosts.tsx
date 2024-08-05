import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import { useEffect, useState } from "react";
import { Button, CheckboxField } from "@aws-amplify/ui-react";
import AddPost from "./AddPost";

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
  const navigate = useNavigate();

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

  const handleSelect = (postId: string) => {
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

  const handleBatchArchive = async () => {
    try {
      const batchArchivePostsResult = await client.mutations.batchArchivePosts({
        ids: Array.from(selectedPosts),
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

      setSelectedPosts(new Set());
    } catch (error) {
      console.error(error);
    }
  };

  const handleBatchRestore = async () => {
    try {
      const batchArchivePostsResult = await client.mutations.batchArchivePosts({
        ids: Array.from(selectedPosts),
        archive: false,
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
              return { ...post, isArchived: false };
            }
            return post;
          });
        });
      }

      setSelectedPosts(new Set());
    } catch (error) {
      console.error(error);
    }
  };

  const handleBatchDelete = async () => {
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

  const handleBatchGet = async () => {
    try {
      const batchGetPostsResult = await client.queries.batchGetPosts({
        ids: Array.from(selectedPosts),
      });
      console.log("batchGetPostsResult", batchGetPostsResult);
      // batchGetPostsResult.data?.items is an array of posts that were retrieved
      // batchGetPostsResult.data?.unprocessedKeys is an array of ids that were not retrieved
      setSelectedPosts(new Set());
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (postId: string) => {
    navigate(`/edit/${postId}`);
  };

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
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
          <p>URL: {post.url}</p>
          <p>Is Archived: {post.isArchived ? "Yes" : "No"}</p>
          <div className="flex">
            <div className="ml-auto">
              <CheckboxField
                checked={selectedPosts.has(post.id)}
                onChange={() => handleSelect(post.id)}
                label="Select"
                name="select"
              />
            </div>
            <div>
              <Button
                onClick={async () => {
                  try {
                    const deletePostResult = await client.mutations.deletePost({
                      id: post.id,
                    });
                    console.log("deletePostResult", deletePostResult);
                    if (deletePostResult.data) {
                      setPosts((prevPosts) =>
                        prevPosts.filter((p) => p.id !== post.id)
                      );
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Delete
              </Button>
              <Button onClick={() => handleEdit(post.id)}>Edit</Button>
            </div>
          </div>
        </div>
      ))}
      <div className="flex space-x-4">
        <div>
          <Button onClick={handleBatchDelete}>Delete Posts</Button>
        </div>
        <div>
          <Button onClick={handleBatchGet}>Get Posts</Button>
        </div>
        <div>
          <Button onClick={handleBatchArchive}>Archive Posts</Button>
        </div>
        <div>
          <Button onClick={handleBatchRestore}>Restore Posts</Button>
        </div>
      </div>
      <AddPost posts={posts} setPosts={setPosts} />
    </>
  );
};
export default ListPosts;
