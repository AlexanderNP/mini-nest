type PropertyMetadataMap = Map<PropertyKey, MetadataValueMap>;

type MetadataValueMap = Map<PropertyKey, unknown>;

export class MetadataStorage {
  private _storage = new WeakMap<object, PropertyMetadataMap>();
  private readonly CLASS_METADATA = Symbol("class_metadata")

  defineMetadata(
    metadataKey: PropertyKey, 
    metadataValue: unknown, 
    target: object, 
    propertyKey?: PropertyKey
  ): void {
    if (!this._storage.has(target)) {
      this._storage.set(target, new Map());
    }

    const PROPERTY_KEY = propertyKey ?? this.CLASS_METADATA;

    const propertyMetadataMap = this._storage.get(target)!;

    if (!propertyMetadataMap.has(PROPERTY_KEY)) {
      propertyMetadataMap.set(PROPERTY_KEY, new Map());
    }

    const metadataValueMap = propertyMetadataMap.get(PROPERTY_KEY);
    metadataValueMap?.set(metadataKey, metadataValue);
  }

  getMetadata<MetaValue>(metadataKey: PropertyKey, target: object, propertyKey?: PropertyKey): MetaValue | undefined {
    const propertyMetadataMap = this._storage.get(target);

    if (!propertyMetadataMap) return undefined;

    const PROPERTY_KEY = propertyKey ?? this.CLASS_METADATA;
    const metadataValueMap = propertyMetadataMap.get(PROPERTY_KEY);

    return metadataValueMap?.get(metadataKey) as MetaValue | undefined;
  }

  hasMetadata(metadataKey: PropertyKey, target: object, propertyKey?: PropertyKey): boolean {
    return this.getMetadata(metadataKey, target, propertyKey) !== undefined;
  }

  get storage() {
    return this._storage;
  }
}

export const metadataStorage = new MetadataStorage();