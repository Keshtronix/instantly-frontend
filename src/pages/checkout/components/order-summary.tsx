import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/helper";
import { useCart } from "@/hooks/use-cart";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "@tanstack/react-query";
import { validateCouponMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { X, Tag } from "lucide-react";
import type { ApplyCouponResponse } from "@/types/coupon.type";

// type OrderSummaryProps = {
//   appliedCoupon: ApplyCouponResponse | null;
//   onCouponApplied: (coupon: ApplyCouponResponse | null) => void;
// };

// OrderSummary — accept the computed total as a prop instead of deriving it internally
type OrderSummaryProps = {
  appliedCoupon: ApplyCouponResponse | null;
  onCouponApplied: (coupon: ApplyCouponResponse | null) => void;
  finalTotal: number;
};

const OrderSummary = ({ appliedCoupon, onCouponApplied, finalTotal }: OrderSummaryProps) => {
  const [couponInput, setCouponInput] = useState("");
  //const { deliveryFee, tax, orderTotal, isCartLoading } = useCart((state) => state);
   const { deliveryFee, tax, isCartLoading } = useCart((state) => state);
  const cartCount = useCart((state) => state.cartCount());
  const cartCount = useCart((state) => state.cartCount());
  const subtotal = useCart((state) => state.cartTotal());

  const discountAmount = appliedCoupon?.discountAmount ?? 0;
 // const baseTotal = orderTotal || subtotal + deliveryFee + tax;
  //const finalTotal = Math.max(baseTotal - discountAmount, 0);

  const applyCouponMutation = useMutation({
    mutationFn: validateCouponMutationFn,
    onSuccess: (data) => {
      onCouponApplied(data);
      toast.success(`Coupon "${data.code}" applied`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Invalid coupon code");
    },
  });

  const handleApply = () => {
    if (!couponInput.trim()) return;
    applyCouponMutation.mutate({ code: couponInput.trim(), subtotal });
  };

  const handleRemove = () => {
    onCouponApplied(null);
    setCouponInput("");
  };

  return (
    <Card className="h-fit bg-background shadow-xs lg:sticky lg:top-24 pt-5">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
          {isCartLoading ? (
            <Skeleton className="h-5 w-16" />
          ) : (
            <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Delivery</span>
          {isCartLoading ? (
            <Skeleton className="h-5 w-16" />
          ) : (
            <span className="font-medium text-primary">
              {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Tax</span>
          {isCartLoading ? (
            <Skeleton className="h-5 w-16" />
          ) : (
            <span className="font-medium text-foreground">{formatPrice(tax)}</span>
          )}
        </div>

        {appliedCoupon ? (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-green-light">
              <Tag className="size-3.5" />
              {appliedCoupon.code}
            </span>
            <span className="flex items-center gap-2 font-medium text-green-light">
              -{formatPrice(discountAmount)}
              <button
                type="button"
                onClick={handleRemove}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="size-3.5" />
              </button>
            </span>
          </div>
        ) : (
          <div className="flex gap-2">
            <Input
              placeholder="Coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              className="h-9"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-9 shrink-0"
              disabled={applyCouponMutation.isPending || !couponInput.trim()}
              onClick={handleApply}
            >
              {applyCouponMutation.isPending ? "Applying..." : "Apply"}
            </Button>
          </div>
        )}

        <Separator />
        <div className="flex items-center justify-between gap-4 text-base font-semibold">
          <span>Total</span>
          {isCartLoading ? <Skeleton className="h-5 w-16" /> : <span>{formatPrice(finalTotal)}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;