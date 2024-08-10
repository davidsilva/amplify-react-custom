import type { Schema } from "../../amplify/data/resource";

type Comment = Schema["Comment"]["type"];

type ListCommentsProps = {
  comments: Comment[];
};

const ListComments = ({ comments }: ListCommentsProps) => {
  return (
    <>
      <div>List Comments</div>
      <ol>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ol>
    </>
  );
};
export default ListComments;
