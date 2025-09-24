import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().trim().toLowerCase().email("auth.invalidEmail"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "auth.pwdWeak"
      ),
    passwordConfirm: z.string(),
  })
  .refine((d) => d.password === d.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "auth.pwdMismatch",
  });

export const signInSchema = z.object({
  email: z.string().trim().toLowerCase().email("auth.invalidEmail"),
  password: z.string().min(1, "auth.required"),
});

export const profileSchema = z.object({
  first_name: z.string().trim().min(2),
  last_name: z.string().trim().min(2),
  // Date de naissance attendue au format JJ/MM/AAAA
  birthdate: z
    .string()
    .trim()
    .transform((s) => s.replace(/[.\-\s]/g, "/"))
    .refine((s) => /^\d{2}\/\d{2}\/\d{4}$/.test(s), "profile.badBirthdate"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-().]{7,20}$/, "profile.badPhone")
    .or(z.literal(""))
    .optional(),
});

export const addressSchemaFR = z.object({
  label: z.string().trim().max(40).optional(),
  line1: z
    .string()
    .trim()
    .min(3)
    // Autorise lettres accentuées basiques, chiffres, espaces, apostrophes, points, virgules et tirets
    .regex(/^[0-9A-Za-zÀ-ÖØ-öø-ÿ'., -]{3,100}$/, "addr.badLine1"),
  line2: z.string().trim().max(100).optional(),
  postal_code: z.string().regex(/^\d{5}$/, "addr.badPostal"),
  city: z
    .string()
    .trim()
    // Lettres (accents basiques), espaces, apostrophes et tirets
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,60}$/, "addr.badCity"),
  country: z.literal("FR"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s\-().]{7,20}$/, "addr.badPhone")
    .or(z.literal(""))
    .optional(),
});
