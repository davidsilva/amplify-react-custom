import { util } from "@aws-appsync/utils";

export function request(ctx) {
  const tableName = "PostTable";

  const batchGetItemRequest = {
    operation: "BatchGetItem",
    tables: {
      [tableName]: {
        keys: ctx.args.ids.map((id) => util.dynamodb.toMapValues({ id })),
        consistentRead: true,
      },
    },
  };

  return batchGetItemRequest;
}

export function response(ctx) {
  console.log("batchGetPosts response ctx", ctx);
  const { error, result } = ctx;
  if (error) {
    if (!ctx.stash.errors) ctx.stash.errors = [];
    ctx.stash.errors.push(error);
    return util.appendError(error.message, error.type, result);
  }

  return {
    items: result.data.PostTable, // items not found will be null
    unprocessedItems: result.unprocessedKeys.PostTable,
  };
}
