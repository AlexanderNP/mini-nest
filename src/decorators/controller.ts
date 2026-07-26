import { metadataStorage } from "../metadata/metadata-storage";
import { CONTROLLER_METADATA_KEY } from "../metadata/metadata-keys";

export function Controller(prefix: string) {
  return function(target: object) {
    metadataStorage.defineMetadata(CONTROLLER_METADATA_KEY, prefix, target);
  }
}