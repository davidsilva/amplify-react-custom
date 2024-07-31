import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { aws_dynamodb } from "aws-cdk-lib";

export const backend = defineBackend({
  auth,
  data,
});

const externalDataSourcesStack = backend.createStack("MyExternalDataSources");

const externalTable = aws_dynamodb.Table.fromTableName(
  externalDataSourcesStack,
  "PostTable", // data source name
  "PostTable" // table name
);

backend.data.addDynamoDbDataSource(
  "ExternalPostTableDataSource",
  externalTable
);
