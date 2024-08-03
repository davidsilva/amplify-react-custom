import { useForm } from "react-hook-form";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { TextField, TextAreaField, Button } from "@aws-amplify/ui-react";

type Nullable<T> = T | null;

type FormData = {
  title: Nullable<string>;
  content: Nullable<string>;
  url: Nullable<string>;
  author: string;
};

type AddPostProps = {
  posts: Schema["Post"]["type"][];
  setPosts: React.Dispatch<React.SetStateAction<Schema["Post"]["type"][]>>;
};

const client = generateClient<Schema>();

const AddPost = ({ posts, setPosts }: AddPostProps) => {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
      url: "",
      author: "",
    },
  });

  const onSubmit = handleSubmit(async (data) => {
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
        reset();
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <h1 className="text-3xl font-bold mt-6">Add Post</h1>
      <form onSubmit={onSubmit}>
        <TextField label="Title" {...register("title", { required: true })} />
        <TextAreaField
          label="Content"
          {...register("content", { required: true })}
        />
        <TextField label="URL" {...register("url")} />
        <TextField label="Author" {...register("author")} />
        <Button type="submit">Add Post</Button>
      </form>
    </>
  );
};
export default AddPost;
