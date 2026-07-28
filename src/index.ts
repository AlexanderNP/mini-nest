import { HttpMethods } from "./constants";
import { Controller } from "./decorators/controller";
import { Get } from "./decorators/get";
import { Post } from "./decorators/post";
import { Roles } from "./decorators/roles";
import { RolesGuard } from "./guards/roles-guard";
import { UseGuards } from "./decorators/use-guards";
import { AllowGuard, DenyGuard } from "./guards/test-guard";
import { router } from "./router/router";
import { controllerScanner } from "./scanner/controller-scanner";

@Controller("/users")
class UserController {
  private users = ["Egor"];

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

const routes = controllerScanner.scan([
  UserController
]);

router.register(routes);

console.log(router.handle(HttpMethods.GET, "/users"));
console.log(router.handle(HttpMethods.GET, "/users/admin"));
console.log(router.handle(HttpMethods.GET, "/users/multi-role"));
console.log(router.handle(HttpMethods.GET, "/users/allow"));

try {
  console.log(router.handle(HttpMethods.GET, "/users/user"));
} catch (e) {
  console.log(e);
}

try {
  console.log(router.handle(HttpMethods.GET, "/users/deny"));
} catch (e) {
  console.log(e);
}

try {
  console.log(router.handle(HttpMethods.GET, "/users/deny-admin"));
} catch (e) {
  console.log(e);
}