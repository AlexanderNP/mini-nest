import { HttpMethods } from "../constants";
import { createMethodDecorator } from "./createMethodDecorator";

export const Patch = createMethodDecorator(HttpMethods.PATCH);