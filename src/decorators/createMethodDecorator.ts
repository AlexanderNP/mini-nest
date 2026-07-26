import { metadataStorage } from '../metadata/metadata-storage';
import { ROUTE_METADATA } from '../metadata/metadata-keys';
import type { RouteMetadata } from '../types';
import type { HttpMethods } from '../constants';

export function createMethodDecorator(method: HttpMethods) {
  return function (path: string) {
    return function (target: object, propertyKey: PropertyKey) {
      const value: RouteMetadata = {
        method,
        path,
      };

      metadataStorage.defineMetadata(
        ROUTE_METADATA,
        value,
        target,
        propertyKey,
      );
    };
  };
}
