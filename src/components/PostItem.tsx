import { useNavigate } from "react-router-dom";
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../amplify/data/resource";
import { Button, CheckboxField } from "@aws-amplify/ui-react";
import AddComment from "./AddComment";
import ListComments from "./ListComments";
import { useState, useEffect } from "react";

const client = generateClient<Schema>({
  authMode: "apiKey",
});

type Post = Schema["Post"]["type"];
type Comment = Schema["Comment"]["type"];

type PostItemProps = {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  selectedPosts: Set<string>;
  handleSelect: (postId: string) => void;
};

const PostItem = ({
  post,
  setPosts,
  selectedPosts,
  handleSelect,
}: PostItemProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const navigate = useNavigate();

  const handleEdit = (postId: string) => {
    navigate(`/edit/${postId}`);
  };

  const handleGetPost = async (postId: string) => {
    try {
      const result = await client.queries.getPostFn({ id: postId });
      console.log("handleGetPost getPostFn", result);
    } catch (error) {
      console.error("could not get post using getPostFn");
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data: items } = await client.models.Comment.list({
          filter: { postId: { eq: post.id } },
        });
        console.log("listComments", items);
        if (items) {
          const filteredComments = items.filter(
            (comment) => comment !== null && comment !== undefined
          ) as Comment[];
          setComments(filteredComments);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [post.id]);

  useEffect(() => {
    const fetchUsingBatchGetComments = async () => {
      try {
        const batchGetCommentsResult = await client.queries.batchGetComments({
          ids: post.comments ?? [],
        });
        console.log("batchGetCommentsResult", batchGetCommentsResult);
      } catch (error) {
        console.error(error);
      }
    };
    if (post.comments && post.comments.length > 0) {
      fetchUsingBatchGetComments();
    }
  }, [post.comments]);

  return (
    <>
      <div>PostItem</div>

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
          <Button onClick={() => handleGetPost(post.id)}>Get</Button>
        </div>
      </div>
      <ListComments comments={comments} />
      <AddComment
        post={post}
        setPosts={setPosts}
        comments={comments}
        setComments={setComments}
      />
    </>
  );
};
export default PostItem;
