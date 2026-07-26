import { metadataStorage } from "../metadata/metadata-storage";
import { GET_METADATA_KEY } from "../metadata/metadata-keys";

export function Get(path: string) {
  return function(target: object, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    metadataStorage.defineMetadata(GET_METADATA_KEY, path, target, propertyKey);
  }
}