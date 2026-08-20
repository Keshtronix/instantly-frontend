// src/constants/profile.ts
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(1, "Phone number is required"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;