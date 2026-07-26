import { HttpMethods } from "../constants";
import { createMethodDecorator } from "./createMethodDecorator";

export const Delete = createMethodDecorator(HttpMethods.DELETE);