import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllCategoriesQueryFn } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { PUBLIC_ROUTES } from "@/routes/route";

const CategoriesSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesQueryFn,
  });

  const categories = data?.categories ?? [];

  if (isLoading) {
    return (
      <section className="py-4 mb-7">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="aspect-[4/3] w-full rounded-md" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-4 mb-7">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-2xl font-semibold text-foreground">
            Popular categories
          </h2>
          <Link
            to={PUBLIC_ROUTES.PRODUCTS}
            className="text-sm font-medium text-foreground hover:underline"
          >
            View All Categories
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${category._id}`}
              className="flex flex-col items-center gap-3 rounded-md bg-neutral-100 p-5 transition hover:bg-neutral-200"
            >
              <span className="flex aspect-square w-full items-center justify-center">
                <img
                  src={category.imageUrl ?? undefined}
                  alt={category.name}
                  className="max-h-full max-w-full object-contain"
                />
              </span>
              <span className="line-clamp-1 text-sm font-medium text-foreground">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;