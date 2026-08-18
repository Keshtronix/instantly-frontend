// src/constants/profile.ts
import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().min(1, "Phone number is required"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;