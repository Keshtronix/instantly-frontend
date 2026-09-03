import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { getStockDisplay, splitPrice } from "@/utils/helper";
import { BanIcon, Plus, Star, TriangleAlert, Truck } from "lucide-react";
import type { MouseEvent } from "react";
import { Link } from "react-router-dom";

export type ProductCardProps = {
  id: string;
  slug: string;
  imageUrl: string;
  name: string;
  salePrice: number;
  originalPrice: number;
  discountPercent?: number;
  discountLabel?: string;
  ratingAverage?: number;
  reviewCount?: number;
  unit: string;
  stockCount?: number;
  className?: string;
};

const ProductCard = ({
  id,
  slug,
  imageUrl,
  name,
  salePrice,
  originalPrice,
  discountPercent,
  discountLabel,
  ratingAverage = 0,
  reviewCount = 0,
  unit,
  stockCount,
  className,
}: ProductCardProps) => {
  const productPath = `/products/${slug}`;

  const hasDiscount = originalPrice > salePrice;

  const stock = getStockDisplay({ stockCount });
  const isOutofStock = stock.status === "out";
  const StockIcon =
    stock.status === "in-stock"
      ? Truck
      : stock.status === "out"
        ? BanIcon
        : TriangleAlert;

  const addToCart = useCart((state) => state.addToCart);
  const items = useCart((state) => state.items);
  const cartItem = items.find((item) => item.productId === id);

  const handleAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart({
      productId: id,
      imageUrl,
      name,
      salePrice,
      originalPrice,
      discountPercent,
      discountLabel,
      unit,
      stockCount,
    });
  };

  return (
    <Card
      className={cn(
        "relative gap-0 rounded-xl bg-white p-0 shadow-none ring-0 overflow-hidden border border-black/10",
        isOutofStock && "opacity-60",
        className,
      )}
    >
      <CardContent className="relative flex flex-col gap-0 p-0">
        {/* Image block */}
        <Link
          to={productPath}
          className="relative flex aspect-square items-center justify-center bg-neutral-100"
        >
          <img
            src={imageUrl}
            alt={name}
            className="max-h-full max-w-full object-contain"
          />

          {Boolean(discountLabel || discountPercent) && (
            <span className="absolute right-3 top-3 rounded-md bg-black px-2.5 py-1 text-xs font-bold tracking-wide text-white">
              {discountLabel || `${discountPercent}% OFF`}
            </span>
          )}

          {isOutofStock && (
            <span className="absolute left-3 top-3 rounded-md bg-black/80 px-2.5 py-1 text-xs font-bold tracking-wide text-white">
              Out of stock
            </span>
          )}
        </Link>

        {/* Details */}
        <div className="flex flex-col gap-2 p-4">
          <Link
            to={productPath}
            className="line-clamp-1 text-base font-semibold leading-tight text-black hover:underline"
          >
            {name}
          </Link>

          {unit && (
            <p className="line-clamp-1 text-sm text-neutral-500">{unit}</p>
          )}

          <div className="flex items-center gap-1 text-sm leading-none">
            <span className="flex text-black" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={cn(
                    "size-3.5 fill-current stroke-current",
                    index >= ratingAverage && "text-neutral-300",
                  )}
                />
              ))}
            </span>
            <span className="text-neutral-500">({reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-lg font-bold text-black">
              ${salePrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-base text-neutral-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div
            className={cn("flex items-center gap-1.5 text-xs text-neutral-500")}
          >
            <StockIcon className="size-3.5" />
            {stock.text}
          </div>

          <Button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutofStock}
            variant="outline"
            className="mt-1 h-10 w-full rounded-md border-black bg-white text-black hover:bg-black hover:text-white disabled:opacity-50"
          >
            <Plus className="size-4 mr-1" />
            {cartItem && cartItem.quantity > 0
              ? `${cartItem.quantity} in cart`
              : "Add to cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
