import { Controller } from "../decorators/controller";
import { Get } from "../decorators/get";
import { Roles } from "../decorators/roles";
import { UseGuards } from "../decorators/use-guards";
import { RolesGuard } from "../guards/roles-guard";
import { AllowGuard, DenyGuard } from "../guards/test-guard";
import { LoggerController } from "./logger";

@Controller("/users")
export class UserController {
  private users = ["Egor"];

  static inject = [LoggerController];

  constructor(
    public readonly logger: LoggerController,
  ) {}
  
  @Get("/")
  list() {
    return this.users;
  }

  // -------------------------
  // RolesGuard
  // -------------------------

  @Roles("admin")
  @UseGuards(RolesGuard)
  @Get("/admin")
  admin() {
    return "admin";
  }

  @Roles("user")
  @UseGuards(RolesGuard)
  @Get("/user")
  user() {
    return "user";
  }

  @Roles("admin", "manager")
  @UseGuards(RolesGuard)
  @Get("/multi-role")
  multiRole() {
    return "multi-role";
  }

  // -------------------------
  // Fake Guards
  // -------------------------

  @UseGuards(AllowGuard)
  @Get("/allow")
  allow() {
    return "allow";
  }

  @UseGuards(DenyGuard)
  @Get("/deny")
  deny() {
    return "deny";
  }

  // -------------------------
  // Несколько Guard
  // -------------------------

  @Roles("admin")
  @UseGuards(AllowGuard, RolesGuard)
  @Get("/allow-admin")
  allowAdmin() {
    return "allow-admin";
  }

  @Roles("admin")
  @UseGuards(DenyGuard, RolesGuard)
  @Get("/deny-admin")
  denyAdmin() {
    return "deny-admin";
  }
}