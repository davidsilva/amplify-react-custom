import type { Schema } from "../resource";

export const handler: Schema["echo"]["functionHandler"] = async (
  event,
  context
) => {
  console.log("echo handler event, context", event, context);
  const start = performance.now();
  return {
    content: `Echoing content: ${event.arguments.content}`,
    executionDuration: performance.now() - start,
  };
};
