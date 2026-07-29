import { Injectable } from "../decorators/injectable";

@Injectable()
export class DatabaseController {}

@Injectable()
export class LoggerController {
  static inject = [DatabaseController];

  constructor(
    public readonly database: DatabaseController,
  ) {}
}