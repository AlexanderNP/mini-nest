import type { HttpMethods } from "./constants";

export type Constructor<T = object> = new (...args: any[]) => T;
export interface RouteMetadata {
    method: HttpMethods;
    path: string;
}

export interface RouteDefinition {
    routePath: string;
    method: HttpMethods;
    controller: Constructor;
    handlerName: string;
}

export interface GuardContext {
    route: RouteDefinition;
    currentRole: string;
}

export interface Guard {
    canActivate(context: GuardContext): boolean;
}

export type GuardConstructor = Constructor<Guard>;