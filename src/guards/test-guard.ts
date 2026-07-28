import type { Guard } from "../types";

export class AllowGuard implements Guard {
  canActivate(): boolean {
    return true;
  }
}

export class DenyGuard implements Guard {
  canActivate(): boolean {
    return false;
  }
}