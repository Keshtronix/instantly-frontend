import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/use-wishlist";
import { PROTECTED_ROUTES } from "@/routes/route";

const WishlistNavButton = () => {
  const { count } = useWishlist();

  return (
    <Link
      to={PROTECTED_ROUTES.WISHLIST}
      className="relative flex shrink-0 items-center gap-2 rounded-lg px-2 py-1.5 text-foreground transition hover:bg-[var(--grey100)]"
    >
      <span className="relative">
        <Heart className="size-7 stroke-[2.3]" />
        {count > 0 && (
          <span
            className={cn(
              "absolute -right-3 -top-2 grid h-5 min-w-6 place-items-center rounded-full px-1.5 text-xs font-bold leading-none text-primary-foreground",
              "bg-green-light"
            )}
          >
            {count > 9 ? "9+" : count}
          </span>
        )}
      </span>
      <span className="hidden text-sm font-bold sm:block">Wishlist</span>
    </Link>
  );
};

export default WishlistNavButton;