import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { TextField, TextAreaField, Button } from "@aws-amplify/ui-react";

type Nullable<T> = T | null;

type Post = Schema["Post"]["type"];

type FormData = {
  title: Nullable<string>;
  content: Nullable<string>;
  url: Nullable<string>;
  author: string;
};

type UpdatePostProps = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Schema["Post"]["type"][]>>;
};

const client = generateClient<Schema>();

const UpdatePost = ({ posts, setPosts }: UpdatePostProps) => {
  const { id: postId } = useParams<{ id: string }>();
  const post = posts.find((post) => post.id === postId);

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      url: post?.url || "",
      author: post?.author || "",
    },
  });

  if (!postId || !post) {
    return <div>Post not found</div>;
  }

  const onSubmit = handleSubmit(async (data) => {
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

      if (updatePostResult.data) {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === postId ? (updatePostResult.data as typeof p) : p
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <h1 className="text-3xl font-bold mt-6">Update Post</h1>
      <form onSubmit={onSubmit}>
        <TextField label="Title" {...register("title", { required: true })} />
        <TextAreaField
          label="Content"
          {...register("content", { required: true })}
        />
        <TextField label="URL" {...register("url")} />
        <TextField label="Author" {...register("author", { required: true })} />
        <Button type="submit">Update Post</Button>
      </form>
    </>
  );
};
export default UpdatePost;
