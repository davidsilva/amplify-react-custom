import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const { limit = 20, nextToken } = ctx.arguments;
  console.log("allPost.js request", ctx);
  return ddb.scan({ limit, nextToken });
}

export function response(ctx) {
  const { items: posts = [], nextToken } = ctx.result;
  console.log("allPost.js response", ctx);
  return { posts, nextToken };
}
