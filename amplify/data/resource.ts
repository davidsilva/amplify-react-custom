import {
  type ClientSchema,
  a,
  defineData,
  defineFunction,
  secret,
} from "@aws-amplify/backend";

const echoHandler = defineFunction({
  entry: "./echo-handler/handler.ts",
});

const getPostHandler = defineFunction({
  name: "getPostHandlerFn",
  entry: "./fns/get-post/handler.ts",
  environment: {
    apiKey: secret("MY_API_KEY"),
  },
});

const schema = a
  .schema({
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
      isArchived: a.boolean(),
      comments: a.id().array(),
    }),

    getPost: a
      .query()
      .arguments({ id: a.id().required() })
      .returns(a.ref("Post"))
      .authorization((allow) => [allow.publicApiKey()])
      .handler(
        a.handler.custom({
          dataSource: "ExternalPostTableDataSource",
          entry: "./custom-appsync-js-resolvers/getPost.js",
        })
      ),

    getPostFn: a
      .query()
      .arguments({ id: a.id().required() })
      .returns(a.ref("Post"))
      .authorization((allow) => [allow.publicApiKey()])
      .handler(a.handler.function(getPostHandler)),

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
          entry: "./custom-appsync-js-resolvers/addPost.js",
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
          entry: "./custom-appsync-js-resolvers/batchDeletePosts.js",
        })
      ),

    BatchGetPosts: a.customType({
      items: a.ref("Post").array(),
      unprocessedItems: a.string().array(),
    }),

    batchGetPosts: a
      .query()
      .arguments({
        ids: a.string().array().required(),
      })
      .returns(a.ref("BatchGetPosts"))
      .authorization((allow) => [allow.publicApiKey()])
      .handler(
        a.handler.custom({
          dataSource: "ExternalPostTableDataSource",
          entry: "./custom-appsync-js-resolvers/batchGetPosts.js",
        })
      ),

    BatchArchivePosts: a.customType({
      items: a.ref("Post").array(),
      unprocessedItems: a.ref("Post").array(),
    }),

    batchArchivePosts: a
      .mutation()
      .arguments({
        ids: a.string().array().required(),
        archive: a.boolean(), // how to set a default value? a.boolean().default(true) doesn't work: Directive "@default" may not be used on ARGUMENT_DEFINITION. Function will archive posts by default. Will set isArchived to false if archive is false.
      })
      .returns(a.ref("BatchArchivePosts"))
      .authorization((allow) => [allow.publicApiKey()])
      .handler([
        a.handler.custom({
          dataSource: "ExternalPostTableDataSource",
          entry: "./custom-appsync-js-resolvers/batchGetPosts.js",
        }),
        a.handler.custom({
          dataSource: "ExternalPostTableDataSource",
          entry: "./custom-appsync-js-resolvers/batchArchivePosts.js",
        }),
      ]),

    listPosts: a
      .query()
      .returns(a.ref("ListPosts"))
      .authorization((allow) => [allow.publicApiKey()])
      .handler(
        a.handler.custom({
          dataSource: "ExternalPostTableDataSource",
          entry: "./custom-appsync-js-resolvers/listPosts.js",
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
        comments: a.id().array(),
      })
      .returns(a.ref("Post"))
      .authorization((allow) => [allow.publicApiKey()])
      .handler(
        a.handler.custom({
          dataSource: "ExternalPostTableDataSource",
          entry: "./custom-appsync-js-resolvers/updatePost.js",
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
          entry: "./custom-appsync-js-resolvers/deletePost.js",
        })
      ),

    Comment: a
      .model({
        content: a.string(),
        postId: a.id(),
      })
      .authorization((allow) => [allow.publicApiKey()]),

    batchGetComments: a
      .query()
      .arguments({ ids: a.id().array() })
      .returns(a.ref("Comment").array())
      .authorization((allow) => [allow.publicApiKey()])
      .handler(
        a.handler.custom({
          dataSource: a.ref("Comment"),
          entry: "./custom-appsync-js-resolvers/batchGetComments.js",
        })
      ),
  })
  .authorization((allow) => [allow.resource(getPostHandler)]);

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
