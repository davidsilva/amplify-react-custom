// https://docs.aws.amazon.com/appsync/latest/devguide/js-aws-appsync-resolver-reference-dynamodb-batch-delete-item.html

import { util } from "@aws-appsync/utils";
// import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  // "BatchDeleteItem is limited to 25 keys"
  console.log("batchDeletePosts request", ctx);
  const tableName = "PostTable";
  const keys = ctx.arguments.ids.map((id) =>
    util.dynamodb.toMapValues({
      id,
    })
  );

  console.log("batchDeletePosts request keys", keys);

  return {
    operation: "BatchDeleteItem",
    tables: {
      [tableName]: keys,
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
  /* 
  Sample response:
  {
    "data": {
        "PostTable": [
            {
                "id": "b24b77aa-75a5-4f33-ad43-f7454be4fca5"
            }
        ]
    },
    "unprocessedKeys": {
        "PostTable": []
    }
}
     */
  const { error, result } = ctx;
  console.log("batchDeletePosts response", result);
  if (error) {
    if (!ctx.stash.errors) ctx.stash.errors = [];
    ctx.stash.errors.push(error);
    return util.appendError(error.message, error.type, result);
  }
  const ids = result.data.PostTable.map((item) => item.id);
  const unprocessedKeys = result.unprocessedKeys.PostTable.map(
    (item) => item.id
  );
  return {
    items: ids,
    unprocessedItems: unprocessedKeys,
    nextToken: result.nextToken || null,
  };
}
