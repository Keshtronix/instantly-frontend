import { z } from "zod";

export const couponSchema = z
  .object({
    code: z.string().trim().min(3, "Code must be at least 3 characters"),
    discountType: z.enum(["percentage", "fixed"]),
    discountValue: z.coerce.number().positive("Must be a positive number"),
    maxDiscountAmount: z.coerce.number().positive().optional(),
    expiresAt: z.string().optional(),
  })
  .refine(
    (data) => !(data.discountType === "percentage" && data.discountValue > 100),
    { message: "Percentage cannot exceed 100", path: ["discountValue"] }
  );

// Input type: what the form fields actually hold (pre-coercion, matches what
// zodResolver's Resolver type expects as input)
export type CouponFormValues = z.input<typeof couponSchema>;

// Output type: what you get after .parse()/submit — this is what
// createCouponMutationFn's payload should be typed as
export type CouponSubmitValues = z.output<typeof couponSchema>;