import { HttpMethods } from "./constants";
import { router } from "./router/router";
import { controllerScanner } from "./scanner/controller-scanner";
import { Container } from "./container";
import { LoggerController, DatabaseController } from "./controllers/logger";
import { UserController } from "./controllers/user";


const routes = controllerScanner.scan([
  UserController
]);

router.register(routes);

// console.log(router.handle(HttpMethods.GET, "/users"));
// console.log(router.handle(HttpMethods.GET, "/users/admin"));
// console.log(router.handle(HttpMethods.GET, "/users/multi-role"));
// console.log(router.handle(HttpMethods.GET, "/users/allow"));

// try {
//   console.log(router.handle(HttpMethods.GET, "/users/user"));
// } catch (e) {
//   console.log(e);
// }

// try {
//   console.log(router.handle(HttpMethods.GET, "/users/deny"));
// } catch (e) {
//   console.log(e);
// }

// try {
//   console.log(router.handle(HttpMethods.GET, "/users/deny-admin"));
// } catch (e) {
//   console.log(e);
// }

const container = new Container();

container.register(
  DatabaseController,
  LoggerController,
  UserController,
);

const user = container.resolve(UserController);

console.log(user);