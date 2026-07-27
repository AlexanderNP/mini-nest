import type { HttpMethods } from "../constants";
import type { RouteDefinition } from "../types";

type RoutePathMap = Map<string, RouteDefinition>;

export class Router {
  private readonly routes = new Map<HttpMethods, RoutePathMap>();

  register(routes: RouteDefinition[]): void {
    for (const route of routes) {
      if (!this.routes.get(route.method)) {
        this.routes.set(route.method, new Map());
      }
  
      const routePathMap = this.routes.get(route.method);
      routePathMap?.set(route.routePath, route);
    }
  }

  handle(method: HttpMethods, path: string): unknown {
    const routePathMap = this.routes.get(method);

    if (!routePathMap) {
      throw Error("Route not found");
    }

    const route = routePathMap.get(path);

    if (!route) {
      throw Error("Route not found");
    }

    const controller = new route.controller();

    const handler = controller[route.handlerName];

    return handler.call(controller);
  }
}

export const router = new Router();