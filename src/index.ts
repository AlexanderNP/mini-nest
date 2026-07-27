import { HttpMethods } from "./constants";
import { Controller } from "./decorators/controller";
import { Get } from "./decorators/get";
import { router } from "./router/router";
import { controllerScanner } from "./scanner/controller-scanner";

@Controller("/users")
class UserController {

  private users = ["Egor"];

  @Get("/")
  list() {
    return this.users;
  }

  @Get("/count")
  count() {
    return this.users.length;
  }
}

const routes = controllerScanner.scan([
  UserController
]);

router.register(routes);

console.log(
  routes,
  router.handle(
    HttpMethods.GET,
    "/users"
  ),
  router.handle(
    HttpMethods.GET,
    "/users/count"
  )
);