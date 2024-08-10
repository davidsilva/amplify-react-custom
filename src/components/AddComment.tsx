import { useForm } from "react-hook-form";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Button, TextAreaField } from "@aws-amplify/ui-react";

type Post = Schema["Post"]["type"];

type FormData = {
  content: string;
};

type AddCommentProps = {
  post: Post;
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  comments: Schema["Comment"]["type"][];
  setComments: React.Dispatch<
    React.SetStateAction<Schema["Comment"]["type"][]>
  >;
};

const client = generateClient<Schema>();

const AddComment = ({
  post,
  setPosts,
  comments,
  setComments,
}: AddCommentProps) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: { content: "" },
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    try {
      const addCommentResult = await client.models.Comment.create({
        content: data.content,
        postId: post.id,
      });
      console.log("addCommentResult", addCommentResult);
      if (addCommentResult.data) {
        console.log("Comment added successfully");
      }
      if (addCommentResult.data && addCommentResult.data.id) {
        setComments([...comments, addCommentResult.data]);
        const updatePostResult = await client.mutations.updatePost({
          ...post,
          comments: [...(post.comments ?? []), addCommentResult.data.id],
          expectedVersion: post.version ?? 1,
        });
        if (updatePostResult.data) {
          console.log("Post updated successfully");
        }
        setPosts((prevPosts) => {
          return prevPosts.map((p) => {
            if (p.id === post.id) {
              return updatePostResult.data as Post;
            }
            return p;
          });
        });
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Add Comment</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextAreaField
          label="Comment"
          {...register("content", { required: true })}
        />
        <Button type="submit">Add Comment</Button>
      </form>
    </>
  );
};
export default AddComment;
