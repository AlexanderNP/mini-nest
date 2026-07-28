import { ROLES_METADATA_KEY } from "../metadata/metadata-keys";
import { metadataStorage } from "../metadata/metadata-storage";

export function Roles(...roles: string[]) {
  return function(target: object, propertyKey: PropertyKey) {
    metadataStorage.defineMetadata(
      ROLES_METADATA_KEY,
      roles,
      target,
      propertyKey,
    );
  }
}

