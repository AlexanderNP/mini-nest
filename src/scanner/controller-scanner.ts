import { metadataStorage } from "../metadata/metadata-storage";
import { CONTROLLER_METADATA_KEY, ROUTE_METADATA } from "../metadata/metadata-keys";
import { normalizePath } from "../utils";
import type { Constructor, RouteMetadata, RouteDefinition } from "../types";

export class ControllerScanner {
  scan(controllers: Constructor[]): RouteDefinition[] {
    const results: RouteDefinition[] = [];
  
    for (const controller of controllers) {
      const prefix = metadataStorage.getMetadata<string>(CONTROLLER_METADATA_KEY, controller);

      if (prefix === undefined) continue;

      const methods = Object.getOwnPropertyNames(controller.prototype);

      for (const method of methods) {
        if (method === "constructor") continue;

        const routeMetadata = metadataStorage.getMetadata<RouteMetadata>(
          ROUTE_METADATA,
          controller.prototype,
          method,
        );

        if (routeMetadata === undefined) continue

        results.push({
          controller,
          handlerName: method,
          method: routeMetadata.method,
          routePath: normalizePath(`${prefix}${routeMetadata.path}`),
        })
      }

    }

    return results;
  }
}