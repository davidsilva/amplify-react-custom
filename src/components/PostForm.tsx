import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextField, TextAreaField } from "@aws-amplify/ui-react";

export type FormData = {
  title: string;
  content: string;
  url: string;
  author: string;
};

type PostFormProps = {
  defaultValues?: FormData;
  onSubmit: SubmitHandler<FormData>;
};

const PostForm = ({
  defaultValues = { title: "", content: "", url: "", author: "" },
  onSubmit,
}: PostFormProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues,
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Title" {...register("title", { required: true })} />
      <TextAreaField
        label="Content"
        {...register("content", { required: true })}
      />
      <TextField label="URL" {...register("url")} />
      <TextField label="Author" {...register("author", { required: true })} />
      <Button type="submit">Submit</Button>
    </form>
  );
};
export default PostForm;
