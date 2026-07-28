import { GUARDS_METADATA_KEY } from "../metadata/metadata-keys";
import { metadataStorage } from "../metadata/metadata-storage";
import type { HttpMethods } from "../constants";
import type { GuardConstructor, RouteDefinition } from "../types";

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

    this.checkGuards(route);

    const controller = new route.controller();

    const handler = controller[route.handlerName];

    return handler.call(controller);
  }

  private checkGuards(route: RouteDefinition): void {
    const guardConstructors = metadataStorage.getMetadata<GuardConstructor[]>(GUARDS_METADATA_KEY, route.controller.prototype, route.handlerName) ?? [];

    for (const guardConstructor of guardConstructors) {
      const guard = new guardConstructor();

      // TODO: получать роль из HTTP Request (Sprint 7)
      const canActivate = guard.canActivate({ route, currentRole: "admin" });

       if (canActivate === false) {
        throw Error("Forbidden");
      }
    }
  }
}

export const router = new Router();