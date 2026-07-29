import { metadataStorage } from "../metadata/metadata-storage"
import { INJECTABLE_METADATA_KEY } from "../metadata/metadata-keys"
import type { Constructor } from "../types"

export function Injectable() {
  return function(target: Constructor) {
    metadataStorage.defineMetadata(
      INJECTABLE_METADATA_KEY,
      true,
      target
    )
  }
}