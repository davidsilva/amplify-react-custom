import { util } from "@aws-appsync/utils";
// import * as ddb from "@aws-appsync/utils/dynamodb";

export function request() {
  // return ddb.scan();
  return {
    operation: "Scan",
  };
}

export function response(ctx) {
  const { error, result } = ctx;
  /* 
https://docs.aws.amazon.com/appsync/latest/devguide/js-aws-appsync-resolver-reference-dynamodb-scan.html

The fields are defined as follows:

items
A list containing the items returned by the DynamoDB scan.

nextToken
If there might be more results, nextToken contains a pagination token that you can use in another request. AWS AppSync encrypts and obfuscates the pagination token returned from DynamoDB. This prevents your table data from being inadvertently leaked to the caller. Also, these pagination tokens can’t be used across different functions or resolvers.

scannedCount
The number of items that were retrieved by DynamoDB before a filter expression (if present) was applied.

ctx.result = {
    items = [ ... ],
    nextToken = "a pagination token",
    scannedCount = 10
}

Working with errors: https://docs.aws.amazon.com/appsync/latest/devguide/writing-code.html#working-with-errors
"If an error occurs in your function during a request, the error will be made available in your function response handler in ctx.error. You can append the error to your GraphQL response using the util.appendError utility. You can make the error available to other functions in the pipeline by using the stash."
 */
  if (error) {
    if (!ctx.stash.errors) ctx.stash.errors = [];
    ctx.stash.errors.push(error);
    return util.appendError(error.message, error.type, result);
  }
  return {
    items: result.items,
    nextToken: result.nextToken,
    scannedCount: result.scannedCount,
  };
}
