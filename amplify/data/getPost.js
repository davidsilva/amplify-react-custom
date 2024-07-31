import * as ddb from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  console.log("getPost.js request", ctx);
  return ddb.get({ key: { id: ctx.args.id } });
}

export const response = (ctx) => {
  console.log("getPost.js response", ctx);
  return ctx.result;
};
