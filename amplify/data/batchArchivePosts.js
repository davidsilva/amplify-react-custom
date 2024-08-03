import { util } from "@aws-appsync/utils";

/* 
* First we'll use BatchGetItem to get the posts for the provided ids argument.
* Then we'll use BatchPutItem to set the isArchived attribute to true.
* In the response, we'll return the updated posts as an items list. Ids of posts that could not be processed will be returned in the unprocessedKeys list.

https://docs.amplify.aws/react/build-a-backend/data/connect-to-existing-data-sources/connect-external-ddb-table/#batchgetitem
*/

export function request(ctx) {
  // We should get an "items" list of posts: prev.result.items
  console.log("batchArchivePosts request ctx", ctx);
  const tableName = "PostTable";
  const postsToPut = ctx.prev.result.items.map((post) => {
    return util.dynamodb.toMapValues({
      ...post,
      isArchived: true,
    });
  });

  const batchGetItemRequest = {
    operation: "BatchPutItem",
    tables: {
      [tableName]: postsToPut,
    },
  };

  return batchGetItemRequest;
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
