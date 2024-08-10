/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const batchGetComments = /* GraphQL */ `query BatchGetComments($ids: [ID]) {
  batchGetComments(ids: $ids) {
    content
    createdAt
    id
    postId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BatchGetCommentsQueryVariables,
  APITypes.BatchGetCommentsQuery
>;
export const batchGetPosts = /* GraphQL */ `query BatchGetPosts($ids: [String]!) {
  batchGetPosts(ids: $ids) {
    items {
      author
      comments
      content
      downs
      id
      isArchived
      title
      ups
      url
      version
      __typename
    }
    unprocessedItems
    __typename
  }
}
` as GeneratedQuery<
  APITypes.BatchGetPostsQueryVariables,
  APITypes.BatchGetPostsQuery
>;
export const echo = /* GraphQL */ `query Echo($content: String) {
  echo(content: $content) {
    content
    executionDuration
    __typename
  }
}
` as GeneratedQuery<APITypes.EchoQueryVariables, APITypes.EchoQuery>;
export const getComment = /* GraphQL */ `query GetComment($id: ID!) {
  getComment(id: $id) {
    content
    createdAt
    id
    postId
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCommentQueryVariables,
  APITypes.GetCommentQuery
>;
export const getPost = /* GraphQL */ `query GetPost($id: ID!) {
  getPost(id: $id) {
    author
    comments
    content
    downs
    id
    isArchived
    title
    ups
    url
    version
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPostQueryVariables, APITypes.GetPostQuery>;
export const getPostFn = /* GraphQL */ `query GetPostFn($id: ID!) {
  getPostFn(id: $id) {
    author
    comments
    content
    downs
    id
    isArchived
    title
    ups
    url
    version
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPostFnQueryVariables, APITypes.GetPostFnQuery>;
export const getTodo = /* GraphQL */ `query GetTodo($id: ID!) {
  getTodo(id: $id) {
    content
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTodoQueryVariables, APITypes.GetTodoQuery>;
export const listComments = /* GraphQL */ `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      content
      createdAt
      id
      postId
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCommentsQueryVariables,
  APITypes.ListCommentsQuery
>;
export const listPosts = /* GraphQL */ `query ListPosts {
  listPosts {
    items {
      author
      comments
      content
      downs
      id
      isArchived
      title
      ups
      url
      version
      __typename
    }
    nextToken
    scannedCount
    __typename
  }
}
` as GeneratedQuery<APITypes.ListPostsQueryVariables, APITypes.ListPostsQuery>;
export const listTodos = /* GraphQL */ `query ListTodos(
  $filter: ModelTodoFilterInput
  $limit: Int
  $nextToken: String
) {
  listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      content
      createdAt
      id
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListTodosQueryVariables, APITypes.ListTodosQuery>;
