// https://docs.aws.amazon.com/appsync/latest/devguide/js-aws-appsync-resolver-reference-dynamodb-batch-delete-item.html

import { util } from "@aws-appsync/utils";
// import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  // "BatchDeleteItem is limited to 25 keys"
  console.log("batchDeletePosts request", ctx);
  const keys = ctx.arguments.ids.map((id) =>
    util.dynamodb.toMapValues({
      id,
    })
  );

  console.log("batchDeletePosts request keys", keys);

  return {
    operation: "BatchDeleteItem",
    tables: {
      PostTable: keys,
    },
  };
}

/* 
ctx.result = {
{
   "data": {
     "authors": [null],
     "posts": [
        // Was deleted
        {
          "authorId": "a1",
          "postId": "p2"
        }
     ]
   },
   "unprocessedKeys": {
     "authors": [
        // This key was not processed due to an error
        {
          "authorId": "a1"
        }
      ],
     "posts": []
   }
}
    */
export function response(ctx) {
  const { error, result } = ctx;
  console.log("batchDeletePosts response", result);
  if (error) {
    if (!ctx.stash.errors) ctx.stash.errors = [];
    ctx.stash.errors.push(error);
    return util.appendError(error.message, error.type, result);
  }
  return result;
}
