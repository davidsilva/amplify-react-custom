import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import { useState } from "react";
import { Button } from "@aws-amplify/ui-react";
import AddPost from "./AddPost";
import PostItem from "./PostItem";

const client = generateClient<Schema>();

type Post = Schema["Post"]["type"];

type ListPostsProps = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const ListPosts = ({ posts, setPosts }: ListPostsProps) => {
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());

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

  return (
    <>
      <h1 className="text-3xl font-bold">List of Posts</h1>
      <p>Count of Posts: {posts.length}</p>
      {posts.map((post) => (
        <div key={post.id} className="my-1 border rounded-md border-black p-1">
          <PostItem
            post={post}
            setPosts={setPosts}
            handleSelect={handleSelect}
            selectedPosts={selectedPosts}
          />
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
