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

const client = generateClient<Schema>();

const AddPost = () => {
  const { register, handleSubmit } = useForm<FormData>({
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
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <>
      <h1>Add Post</h1>
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
