import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getWishlistQueryFn,
  addToWishlistMutationFn,
  removeFromWishlistMutationFn,
} from "@/lib/api";

export const useWishlist = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlistQueryFn,
  });

  const products = data?.products ?? [];
  const wishlistIds = new Set(products.map((p) => p._id));

  const addMutation = useMutation({
    mutationFn: addToWishlistMutationFn,
    onSuccess: (result) => {
      queryClient.setQueryData(["wishlist"], result);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to add to wishlist");
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFromWishlistMutationFn,
    onSuccess: (result) => {
      queryClient.setQueryData(["wishlist"], result);
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to remove from wishlist");
    },
  });

  const isInWishlist = (productId: string) => wishlistIds.has(productId);

  const toggleWishlist = (productId: string) => {
    if (isInWishlist(productId)) {
      removeMutation.mutate(productId);
    } else {
      addMutation.mutate(productId);
    }
  };

  return {
    products,
    count: products.length,
    isLoading,
    isInWishlist,
    toggleWishlist,
    isPending: addMutation.isPending || removeMutation.isPending,
  };
};