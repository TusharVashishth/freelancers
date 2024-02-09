import vine from "@vinejs/vine";
import { CustomErrorReporter } from "./customErrorReporter";

vine.errorReporter = () => new CustomErrorReporter();

const registerSchema = vine.object({
  name: vine.string().minLength(2).maxLength(50),
  username: vine.string().minLength(5).maxLength(50),
  email: vine.string().email(),
  password: vine.string().minLength(6).maxLength(40).confirmed(),
});

const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string(),
});

export const registerValidator = vine.compile(registerSchema);
export const loginValidator = vine.compile(loginSchema);
