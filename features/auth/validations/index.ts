import { z } from "zod";
import escapeHtml from "escape-html";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;

const emailField = z
  .string()
  .trim()
  .regex(emailRegex, "Vous devez fournir un email valide.")
  .transform(escapeHtml);

const passwordField = z
  .string()
  .regex(
    passwordRegex,
    "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole spécial."
  )
  .transform(escapeHtml);

export const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Le nom est trop court" })
    .max(50, { message: "Veuillez inserer 50 caracteres max." })
    .transform(escapeHtml),
  email: emailField,
  password: passwordField,
});
export const signInSchema = z.object({
  email: emailField,
  password: z.string().transform(escapeHtml),
});

export const forgotPasswordSchema = z.object({
  email: emailField,
});
export const resetPasswordSchema = z
  .object({
    password: passwordField,
    newPassword: z.string().transform(escapeHtml),
  })
  .refine((data) => data.newPassword === data.password, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });
