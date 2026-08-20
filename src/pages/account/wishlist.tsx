import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { WishlistButton } from "@/components/wishlist-button";
import { useWishlist } from "@/hooks/use-wishlist";

const WishlistPage = () => {
  const { products, isLoading } = useWishlist();

  return (
    <div className="flex w-full max-w-5xl flex-col gap-6 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold text-foreground">Wishlist</h1>
        <p className="text-sm text-muted-foreground">
          Products you've saved for later.
        </p>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product._id} className="overflow-hidden">
              <div className="relative">
                <Link to={`/products/${product.slug}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="aspect-square w-full object-cover"
                  />
                </Link>
                <WishlistButton
                  productId={product._id}
                  className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
                />
              </div>
              <CardContent className="flex flex-col gap-1 p-3">
                <Link
                  to={`/products/${product.slug}`}
                  className="line-clamp-1 font-medium text-foreground"
                >
                  {product.name}
                </Link>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    ${product.salePrice}
                  </span>
                  {product.discountPercent > 0 && (
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Empty className="border border-border">
          <EmptyMedia variant="icon">
            <Heart />
          </EmptyMedia>
          <EmptyHeader>
            <EmptyTitle>Your wishlist is empty</EmptyTitle>
            <EmptyDescription>
              Save products you love to find them here later.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
    </div>
  );
};

export default WishlistPage;