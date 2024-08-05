import { useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Alert } from "@aws-amplify/ui-react";
import PostForm from "./PostForm";
import type { FormData } from "./PostForm";

type AddPostProps = {
  posts: Schema["Post"]["type"][];
  setPosts: React.Dispatch<React.SetStateAction<Schema["Post"]["type"][]>>;
};

const client = generateClient<Schema>();

const AddPost = ({ posts, setPosts }: AddPostProps) => {
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const addPostResult = await client.mutations.addPost({
        title: data.title,
        content: data.content,
        url: data.url,
        author: data.author,
      });
      console.log("addPostResult", addPostResult);
      if (addPostResult.data) {
        setPosts([...posts, addPostResult.data]);
        setSubmissionStatus("success");
      }
    } catch (error) {
      console.error(error);
      setSubmissionStatus("error");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mt-6">Add Post</h1>
      {submissionStatus === "success" && (
        <Alert variation="success" isDismissible={true}>
          Post added successfully.
        </Alert>
      )}
      {submissionStatus === "error" && (
        <Alert variation="error" isDismissible={true}>
          Failed to add post.
        </Alert>
      )}
      <PostForm onSubmit={onSubmit} />
    </>
  );
};
export default AddPost;
