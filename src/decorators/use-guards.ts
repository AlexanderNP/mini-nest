import { GUARDS_METADATA_KEY } from "../metadata/metadata-keys";
import { metadataStorage } from "../metadata/metadata-storage";
import type { GuardConstructor } from "../types";

export function UseGuards(...guards: GuardConstructor[]) {
  return function(target: object, propertyKey: PropertyKey) {
    metadataStorage.defineMetadata(
      GUARDS_METADATA_KEY,
      guards,
      target,
      propertyKey,
    );
  }
}