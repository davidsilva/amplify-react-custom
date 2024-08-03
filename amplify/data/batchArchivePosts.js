import { util } from "@aws-appsync/utils";

/* 
* This function takes input from batchGetPosts.js.
* By default, the isArchived field of each post is set to true. A supplied "archive" argument can be used to set the field to false.
* In the response, we return the updated posts as an items list. Ids of posts that could not be processed will be returned in the unprocessedKeys list.

https://docs.amplify.aws/react/build-a-backend/data/connect-to-existing-data-sources/connect-external-ddb-table/#batchgetitem

"Items that haven’t been processed are marked as null inside the data block and are placed inside the unprocessedItems block."
https://docs.aws.amazon.com/appsync/latest/devguide/js-aws-appsync-resolver-reference-dynamodb-batch-put-item.html
*/

export function request(ctx) {
  // We should get an "items" list of posts: prev.result.items
  // Default archive to true. If false, we'll unarchive/restore the posts.
  console.log("batchArchivePosts request ctx", ctx);
  const { archive = true } = ctx.args;
  const tableName = "PostTable";
  const postsToPut = ctx.prev.result.items.map((post) => {
    return util.dynamodb.toMapValues({
      ...post,
      isArchived: archive,
    });
  });

  const batchPutItemRequest = {
    operation: "BatchPutItem",
    tables: {
      [tableName]: postsToPut,
    },
  };

  return batchPutItemRequest;
}

export function response(ctx) {
  console.log("batchArchivePosts response ctx", ctx);
  const { error, result } = ctx;
  if (error) {
    if (!ctx.stash.errors) ctx.stash.errors = [];
    ctx.stash.errors.push(error);
    return util.appendError(error.message, error.type, result);
  }

  return {
    items: result.data.PostTable, // items not found will be null
    unprocessedItems: result.unprocessedItems?.PostTable,
  };
}
