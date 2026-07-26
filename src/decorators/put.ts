import { HttpMethods } from "../constants";
import { createMethodDecorator } from "./createMethodDecorator";

export const Put = createMethodDecorator(HttpMethods.PUT);