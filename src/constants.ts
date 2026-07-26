export const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  DELETE: "DELETE",
  PUT: "PUT"
} as const;

export type HttpMethods = (typeof HttpMethods)[keyof typeof HttpMethods]