import type { HttpMethods } from "./constants";

export type Constructor = new (...args: unknown[]) => unknown;
export interface RouteMetadata {
    method: HttpMethods;
    path: string;
}

export interface RouteDefinition {
  routePath: string;
  method: HttpMethods;
  controller: Constructor
  handlerName: string;
}