import { ROLES_METADATA_KEY } from "../metadata/metadata-keys";
import { metadataStorage } from "../metadata/metadata-storage";
import type { Guard, GuardContext } from "../types";

export class RolesGuard implements Guard {
  canActivate(context: GuardContext): boolean {
    const { route, currentRole } = context;

    const metadataValue = metadataStorage.getMetadata<string[]>(ROLES_METADATA_KEY, route.controller.prototype, route.handlerName);

    return metadataValue === undefined ? true : metadataValue.includes(currentRole);
  }
}