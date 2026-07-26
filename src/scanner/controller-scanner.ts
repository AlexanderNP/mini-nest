import { metadataStorage } from "../metadata/metadata-storage";
import { CONTROLLER_METADATA_KEY, GET_METADATA_KEY } from "../metadata/metadata-keys";
import { HttpMethods } from "../constants";;
import { normalizePath } from "../utils";
import type { Constructor } from "../types";

interface RouteDefinition {
  routePath: string;
  method: HttpMethods;
  controller: Constructor
  handlerName: string;
}

export class ControllerScanner {
  scan(controllers: Constructor[]): RouteDefinition[] {
    const results: RouteDefinition[] = [];
  
    for (const controller of controllers) {
      const prefix = metadataStorage.getMetadata<string>(CONTROLLER_METADATA_KEY, controller);

      if (prefix === undefined) continue;

      const methods = Object.getOwnPropertyNames(controller.prototype);

      for (const method of methods) {
        if (method === "constructor") continue;

        const path = metadataStorage.getMetadata<string>(
          GET_METADATA_KEY,
          controller.prototype,
          method,
        );

        if (path === undefined) continue

        results.push({
          controller,
          handlerName: method,
          method: HttpMethods.GET,
          routePath: normalizePath(`${prefix}${path}`),
        })
      }

    }

    return results;
  }
}