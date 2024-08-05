import { useState } from "react";
import { useParams } from "react-router-dom";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Alert } from "@aws-amplify/ui-react";
import type { FormData } from "./PostForm";
import PostForm from "./PostForm";

type Post = Schema["Post"]["type"];

type UpdatePostProps = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Schema["Post"]["type"][]>>;
};

const client = generateClient<Schema>();

const UpdatePost = ({ posts, setPosts }: UpdatePostProps) => {
  const { id: postId } = useParams<{ id: string }>();
  console.log("UpdatePost postId", postId);
  const post = posts.find((post) => post.id === postId);

  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  if (!postId || !post) {
    return <div>Post not found</div>;
  }

  const onSubmit = async (data: FormData) => {
    console.log("UpdatePost handleSubmit", data);
    try {
      const expectedVersion = post.version ?? 0;
      const updatePostResult = await client.mutations.updatePost({
        id: postId,
        title: data.title,
        content: data.content,
        url: data.url,
        author: data.author,
        expectedVersion: expectedVersion,
      });

      console.log("updatePostResult", updatePostResult);
      if (updatePostResult.data) {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId ? (updatePostResult.data as typeof p) : p
          )
        );
        setSubmissionStatus("success");
      }
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
    }
  };

  return (
    <>
      {submissionStatus === "success" && (
        <Alert variation="success" hasIcon={true} isDismissible={true}>
          Updated Successfully
        </Alert>
      )}

      {submissionStatus === "error" && (
        <Alert variation="error" hasIcon={true} isDismissible={true}>
          Error updating post
        </Alert>
      )}

      <h1 className="text-3xl font-bold mt-6">Update Post</h1>
      <PostForm
        defaultValues={{
          title: post.title || "",
          content: post.content || "",
          url: post.url || "",
          author: post.author || "",
        }}
        onSubmit={onSubmit}
      />
    </>
  );
};
export default UpdatePost;
