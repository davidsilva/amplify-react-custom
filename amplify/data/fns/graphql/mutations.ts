/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const addPost = /* GraphQL */ `mutation AddPost(
  $author: String!
  $content: String
  $id: ID
  $title: String
  $url: String
) {
  addPost(
    author: $author
    content: $content
    id: $id
    title: $title
    url: $url
  ) {
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
` as GeneratedMutation<
  APITypes.AddPostMutationVariables,
  APITypes.AddPostMutation
>;
export const batchArchivePosts = /* GraphQL */ `mutation BatchArchivePosts($archive: Boolean, $ids: [String]!) {
  batchArchivePosts(archive: $archive, ids: $ids) {
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
    unprocessedItems {
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
    __typename
  }
}
` as GeneratedMutation<
  APITypes.BatchArchivePostsMutationVariables,
  APITypes.BatchArchivePostsMutation
>;
export const batchDeletePosts = /* GraphQL */ `mutation BatchDeletePosts($ids: [String]!) {
  batchDeletePosts(ids: $ids) {
    items
    nextToken
    unprocessedKeys
    __typename
  }
}
` as GeneratedMutation<
  APITypes.BatchDeletePostsMutationVariables,
  APITypes.BatchDeletePostsMutation
>;
export const createComment = /* GraphQL */ `mutation CreateComment(
  $condition: ModelCommentConditionInput
  $input: CreateCommentInput!
) {
  createComment(condition: $condition, input: $input) {
    content
    createdAt
    id
    postId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateCommentMutationVariables,
  APITypes.CreateCommentMutation
>;
export const createTodo = /* GraphQL */ `mutation CreateTodo(
  $condition: ModelTodoConditionInput
  $input: CreateTodoInput!
) {
  createTodo(condition: $condition, input: $input) {
    content
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTodoMutationVariables,
  APITypes.CreateTodoMutation
>;
export const deleteComment = /* GraphQL */ `mutation DeleteComment(
  $condition: ModelCommentConditionInput
  $input: DeleteCommentInput!
) {
  deleteComment(condition: $condition, input: $input) {
    content
    createdAt
    id
    postId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteCommentMutationVariables,
  APITypes.DeleteCommentMutation
>;
export const deletePost = /* GraphQL */ `mutation DeletePost($expectedVersion: Int, $id: ID!) {
  deletePost(expectedVersion: $expectedVersion, id: $id) {
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
` as GeneratedMutation<
  APITypes.DeletePostMutationVariables,
  APITypes.DeletePostMutation
>;
export const deleteTodo = /* GraphQL */ `mutation DeleteTodo(
  $condition: ModelTodoConditionInput
  $input: DeleteTodoInput!
) {
  deleteTodo(condition: $condition, input: $input) {
    content
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTodoMutationVariables,
  APITypes.DeleteTodoMutation
>;
export const updateComment = /* GraphQL */ `mutation UpdateComment(
  $condition: ModelCommentConditionInput
  $input: UpdateCommentInput!
) {
  updateComment(condition: $condition, input: $input) {
    content
    createdAt
    id
    postId
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateCommentMutationVariables,
  APITypes.UpdateCommentMutation
>;
export const updatePost = /* GraphQL */ `mutation UpdatePost(
  $author: String
  $comments: [ID]
  $content: String
  $expectedVersion: Int!
  $id: ID!
  $title: String
  $url: String
) {
  updatePost(
    author: $author
    comments: $comments
    content: $content
    expectedVersion: $expectedVersion
    id: $id
    title: $title
    url: $url
  ) {
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
` as GeneratedMutation<
  APITypes.UpdatePostMutationVariables,
  APITypes.UpdatePostMutation
>;
export const updateTodo = /* GraphQL */ `mutation UpdateTodo(
  $condition: ModelTodoConditionInput
  $input: UpdateTodoInput!
) {
  updateTodo(condition: $condition, input: $input) {
    content
    createdAt
    id
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTodoMutationVariables,
  APITypes.UpdateTodoMutation
>;
