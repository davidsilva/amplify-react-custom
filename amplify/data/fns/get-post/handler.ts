import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../resource";
import { env } from "$amplify/env/getPostHandlerFn";
import type { AppSyncResolverEvent } from "aws-lambda";
import { getPostFn } from "../graphql/queries";

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
        region: env.AWS_REGION,
        defaultAuthMode: "apiKey",
        apiKey: env.apiKey,
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  }
);

const dataClient = generateClient<Schema>({
  authMode: "apiKey",
});

export const handler: Schema["getPostFn"]["functionHandler"] = async (
  event: AppSyncResolverEvent<{ id: string }>
) => {
  console.log("getPostFn event", event);
  try {
    // const getPostFnResult = await dataClient.queries.getPost({
    //   id: event.arguments.id,
    // });
    const getPostFnResult = await dataClient.graphql({
      query: getPostFn,
      variables: { id: event.arguments.id },
    });

    console.log("getPostFnResult", getPostFnResult);

    if (!getPostFnResult.data || !getPostFnResult.data.getPostFn) {
      console.error("getPostFn no data");
      throw new Error("Error getting post: no data");
    }

    const post = {
      id: getPostFnResult.data.getPostFn.id ?? "",
      author: getPostFnResult.data.getPostFn.author ?? "",
      title: getPostFnResult.data.getPostFn.title ?? null,
      content: getPostFnResult.data.getPostFn.content ?? null,
      url: getPostFnResult.data.getPostFn.url ?? null,
      ups: getPostFnResult.data.getPostFn.ups ?? null,
      downs: getPostFnResult.data.getPostFn.downs ?? null,
      version: getPostFnResult.data.getPostFn.version ?? null,
      isArchived: getPostFnResult.data.getPostFn.isArchived ?? null,
    };

    return post;
  } catch (error) {
    console.error("Error getPostFn", error);
    throw new Error("Error getting post");
  }
};
