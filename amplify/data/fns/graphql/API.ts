/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Comment = {
  __typename: "Comment",
  content?: string | null,
  createdAt: string,
  id: string,
  postId?: string | null,
  updatedAt: string,
};

export type BatchGetPosts = {
  __typename: "BatchGetPosts",
  items?:  Array<Post | null > | null,
  unprocessedItems?: Array< string | null > | null,
};

export type Post = {
  __typename: "Post",
  author: string,
  comments?: Array< string | null > | null,
  content?: string | null,
  downs?: number | null,
  id: string,
  isArchived?: boolean | null,
  title?: string | null,
  ups?: number | null,
  url?: string | null,
  version?: number | null,
};

export type EchoResponse = {
  __typename: "EchoResponse",
  content?: string | null,
  executionDuration?: number | null,
};

export type Todo = {
  __typename: "Todo",
  content?: string | null,
  createdAt: string,
  id: string,
  updatedAt: string,
};

export type ModelCommentFilterInput = {
  and?: Array< ModelCommentFilterInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelCommentFilterInput | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  postId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelCommentConnection = {
  __typename: "ModelCommentConnection",
  items:  Array<Comment | null >,
  nextToken?: string | null,
};

export type ListPosts = {
  __typename: "ListPosts",
  items?:  Array<Post | null > | null,
  nextToken?: string | null,
  scannedCount?: number | null,
};

export type ModelTodoFilterInput = {
  and?: Array< ModelTodoFilterInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelTodoFilterInput | null,
  or?: Array< ModelTodoFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection",
  items:  Array<Todo | null >,
  nextToken?: string | null,
};

export type BatchArchivePosts = {
  __typename: "BatchArchivePosts",
  items?:  Array<Post | null > | null,
  unprocessedItems?:  Array<Post | null > | null,
};

export type BatchDeletePosts = {
  __typename: "BatchDeletePosts",
  items?: Array< string | null > | null,
  nextToken?: string | null,
  unprocessedKeys?: Array< string | null > | null,
};

export type ModelCommentConditionInput = {
  and?: Array< ModelCommentConditionInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelCommentConditionInput | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  postId?: ModelIDInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateCommentInput = {
  content?: string | null,
  id?: string | null,
  postId?: string | null,
};

export type ModelTodoConditionInput = {
  and?: Array< ModelTodoConditionInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelTodoConditionInput | null,
  or?: Array< ModelTodoConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateTodoInput = {
  content?: string | null,
  id?: string | null,
};

export type DeleteCommentInput = {
  id: string,
};

export type DeleteTodoInput = {
  id: string,
};

export type UpdateCommentInput = {
  content?: string | null,
  id: string,
  postId?: string | null,
};

export type UpdateTodoInput = {
  content?: string | null,
  id: string,
};

export type ModelSubscriptionCommentFilterInput = {
  and?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionCommentFilterInput | null > | null,
  postId?: ModelSubscriptionIDInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionTodoFilterInput = {
  and?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionTodoFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type BatchGetCommentsQueryVariables = {
  ids?: Array< string | null > | null,
};

export type BatchGetCommentsQuery = {
  batchGetComments?:  Array< {
    __typename: "Comment",
    content?: string | null,
    createdAt: string,
    id: string,
    postId?: string | null,
    updatedAt: string,
  } | null > | null,
};

export type BatchGetPostsQueryVariables = {
  ids: Array< string | null >,
};

export type BatchGetPostsQuery = {
  batchGetPosts?:  {
    __typename: "BatchGetPosts",
    items?:  Array< {
      __typename: "Post",
      author: string,
      comments?: Array< string | null > | null,
      content?: string | null,
      downs?: number | null,
      id: string,
      isArchived?: boolean | null,
      title?: string | null,
      ups?: number | null,
      url?: string | null,
      version?: number | null,
    } | null > | null,
    unprocessedItems?: Array< string | null > | null,
  } | null,
};

export type EchoQueryVariables = {
  content?: string | null,
};

export type EchoQuery = {
  echo?:  {
    __typename: "EchoResponse",
    content?: string | null,
    executionDuration?: number | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment?:  {
    __typename: "Comment",
    content?: string | null,
    createdAt: string,
    id: string,
    postId?: string | null,
    updatedAt: string,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    author: string,
    comments?: Array< string | null > | null,
    content?: string | null,
    downs?: number | null,
    id: string,
    isArchived?: boolean | null,
    title?: string | null,
    ups?: number | null,
    url?: string | null,
    version?: number | null,
  } | null,
};

export type GetPostFnQueryVariables = {
  id: string,
};

export type GetPostFnQuery = {
  getPostFn?:  {
    __typename: "Post",
    author: string,
    comments?: Array< string | null > | null,
    content?: string | null,
    downs?: number | null,
    id: string,
    isArchived?: boolean | null,
    title?: string | null,
    ups?: number | null,
    url?: string | null,
    version?: number | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments?:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      content?: string | null,
      createdAt: string,
      id: string,
      postId?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPostsQueryVariables = {
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ListPosts",
    items?:  Array< {
      __typename: "Post",
      author: string,
      comments?: Array< string | null > | null,
      content?: string | null,
      downs?: number | null,
      id: string,
      isArchived?: boolean | null,
      title?: string | null,
      ups?: number | null,
      url?: string | null,
      version?: number | null,
    } | null > | null,
    nextToken?: string | null,
    scannedCount?: number | null,
  } | null,
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos?:  {
    __typename: "ModelTodoConnection",
    items:  Array< {
      __typename: "Todo",
      content?: string | null,
      createdAt: string,
      id: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AddPostMutationVariables = {
  author: string,
  content?: string | null,
  id?: string | null,
  title?: string | null,
  url?: string | null,
};

export type AddPostMutation = {
  addPost?:  {
    __typename: "Post",
    author: string,
    comments?: Array< string | null > | null,
    content?: string | null,
    downs?: number | null,
    id: string,
    isArchived?: boolean | null,
    title?: string | null,
    ups?: number | null,
    url?: string | null,
    version?: number | null,
  } | null,
};

export type BatchArchivePostsMutationVariables = {
  archive?: boolean | null,
  ids: Array< string | null >,
};

export type BatchArchivePostsMutation = {
  batchArchivePosts?:  {
    __typename: "BatchArchivePosts",
    items?:  Array< {
      __typename: "Post",
      author: string,
      comments?: Array< string | null > | null,
      content?: string | null,
      downs?: number | null,
      id: string,
      isArchived?: boolean | null,
      title?: string | null,
      ups?: number | null,
      url?: string | null,
      version?: number | null,
    } | null > | null,
    unprocessedItems?:  Array< {
      __typename: "Post",
      author: string,
      comments?: Array< string | null > | null,
      content?: string | null,
      downs?: number | null,
      id: string,
      isArchived?: boolean | null,
      title?: string | null,
      ups?: number | null,
      url?: string | null,
      version?: number | null,
    } | null > | null,
  } | null,
};

export type BatchDeletePostsMutationVariables = {
  ids: Array< string | null >,
};

export type BatchDeletePostsMutation = {
  batchDeletePosts?:  {
    __typename: "BatchDeletePosts",
    items?: Array< string | null > | null,
    nextToken?: string | null,
    unprocessedKeys?: Array< string | null > | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  condition?: ModelCommentConditionInput | null,
  input: CreateCommentInput,
};

export type CreateCommentMutation = {
  createComment?:  {
    __typename: "Comment",
    content?: string | null,
    createdAt: string,
    id: string,
    postId?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateTodoMutationVariables = {
  condition?: ModelTodoConditionInput | null,
  input: CreateTodoInput,
};

export type CreateTodoMutation = {
  createTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type DeleteCommentMutationVariables = {
  condition?: ModelCommentConditionInput | null,
  input: DeleteCommentInput,
};

export type DeleteCommentMutation = {
  deleteComment?:  {
    __typename: "Comment",
    content?: string | null,
    createdAt: string,
    id: string,
    postId?: string | null,
    updatedAt: string,
  } | null,
};

export type DeletePostMutationVariables = {
  expectedVersion?: number | null,
  id: string,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    author: string,
    comments?: Array< string | null > | null,
    content?: string | null,
    downs?: number | null,
    id: string,
    isArchived?: boolean | null,
    title?: string | null,
    ups?: number | null,
    url?: string | null,
    version?: number | null,
  } | null,
};

export type DeleteTodoMutationVariables = {
  condition?: ModelTodoConditionInput | null,
  input: DeleteTodoInput,
};

export type DeleteTodoMutation = {
  deleteTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type UpdateCommentMutationVariables = {
  condition?: ModelCommentConditionInput | null,
  input: UpdateCommentInput,
};

export type UpdateCommentMutation = {
  updateComment?:  {
    __typename: "Comment",
    content?: string | null,
    createdAt: string,
    id: string,
    postId?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdatePostMutationVariables = {
  author?: string | null,
  comments?: Array< string | null > | null,
  content?: string | null,
  expectedVersion: number,
  id: string,
  title?: string | null,
  url?: string | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    author: string,
    comments?: Array< string | null > | null,
    content?: string | null,
    downs?: number | null,
    id: string,
    isArchived?: boolean | null,
    title?: string | null,
    ups?: number | null,
    url?: string | null,
    version?: number | null,
  } | null,
};

export type UpdateTodoMutationVariables = {
  condition?: ModelTodoConditionInput | null,
  input: UpdateTodoInput,
};

export type UpdateTodoMutation = {
  updateTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment?:  {
    __typename: "Comment",
    content?: string | null,
    createdAt: string,
    id: string,
    postId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnCreateTodoSubscription = {
  onCreateTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment?:  {
    __typename: "Comment",
    content?: string | null,
    createdAt: string,
    id: string,
    postId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCommentSubscriptionVariables = {
  filter?: ModelSubscriptionCommentFilterInput | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment?:  {
    __typename: "Comment",
    content?: string | null,
    createdAt: string,
    id: string,
    postId?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateTodoSubscriptionVariables = {
  filter?: ModelSubscriptionTodoFilterInput | null,
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?:  {
    __typename: "Todo",
    content?: string | null,
    createdAt: string,
    id: string,
    updatedAt: string,
  } | null,
};
