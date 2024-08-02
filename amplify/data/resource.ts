import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
} from "@aws-amplify/backend";

const echoHandler = defineFunction({
  entry: "./echo-handler/handler.ts",
});

const schema = a.schema({
  EchoResponse: a.customType({
    content: a.string(),
    executionDuration: a.float(),
  }),

  echo: a
    .query()
    .arguments({ content: a.string() })
    .returns(a.ref("EchoResponse"))
    .authorization((allow) => [allow.publicApiKey()])
    // 3. set the function has the handler
    .handler(a.handler.function(echoHandler)),

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

  ListPosts: a.customType({
    items: a.ref("Post").array(),
    nextToken: a.string() || null,
    scannedCount: a.integer(),
  }),

  BatchDeletePosts: a.customType({
    items: a.string().array(),
    unprocessedKeys: a.string().array(),
    nextToken: a.string() || null,
  }),

  batchDeletePosts: a
    .mutation()
    .arguments({
      ids: a.string().array().required(),
    })
    .returns(a.ref("BatchDeletePosts"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ExternalPostTableDataSource",
        entry: "./batchDeletePosts.js",
      })
    ),

  listPosts: a
    .query()
    .returns(a.ref("ListPosts"))
    .authorization((allow) => [allow.publicApiKey()])
    .handler(
      a.handler.custom({
        dataSource: "ExternalPostTableDataSource",
        entry: "./listPosts.js",
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
