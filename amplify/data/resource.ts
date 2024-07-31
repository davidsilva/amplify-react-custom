import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Post: a.customType({
    id: a.id().required(),
    author: a.string().required(),
    title: a.string(),
    content: a.string(),
    url: a.string(),
    ups: a.integer(),
    downs: a.integer(),
    version: a.integer(),
  }),

  addPost: a
    .mutation()
    .arguments({
      id: a.id(),
      author: a.string().required(),
      title: a.string(),
      content: a.string(),
      url: a.string(),
    })
    .returns(a.ref("Post"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ExternalPostTableDataSource",
        entry: "./addPost.js",
      })
    ),

  getPost: a
    .query()
    .arguments({ id: a.id().required() })
    .returns(a.ref("Post"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ExternalPostTableDataSource",
        entry: "./getPost.js",
      })
    ),

  updatePost: a
    .mutation()
    .arguments({
      id: a.id().required(),
      author: a.string(),
      title: a.string(),
      content: a.string(),
      url: a.string(),
      expectedVersion: a.integer().required(),
    })
    .returns(a.ref("Post"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ExternalPostTableDataSource",
        entry: "./updatePost.js",
      })
    ),

  deletePost: a
    .mutation()
    .arguments({ id: a.id().required(), expectedVersion: a.integer() })
    .returns(a.ref("Post"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ExternalPostTableDataSource",
        entry: "./deletePost.js",
      })
    ),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
