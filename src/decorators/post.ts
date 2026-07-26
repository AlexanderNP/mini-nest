import { HttpMethods } from "../constants";
import { createMethodDecorator } from "./createMethodDecorator";

export const Post = createMethodDecorator(HttpMethods.POST);