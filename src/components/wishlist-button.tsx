import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";

export const WishlistButton = ({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) => {
  const { isInWishlist, toggleWishlist, isPending } = useWishlist();
  const active = isInWishlist(productId);

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn("rounded-full", className)}
      disabled={isPending}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
    >
      <Heart className={cn("size-4", active && "fill-current text-red-500")} />
    </Button>
  );
};