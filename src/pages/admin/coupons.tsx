import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  couponSchema,
  type CouponFormValues,
  type CouponSubmitValues,
} from "@/constants/coupon";
import {
  getAdminCouponsQueryFn,
  createCouponMutationFn,
  toggleCouponActiveMutationFn,
  deleteCouponMutationFn,
} from "@/lib/api";

export default function AdminCouponsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: couponsData, isLoading } = useQuery({
    queryKey: ["admin-coupons", page, limit],
    queryFn: () => getAdminCouponsQueryFn({ page, limit }),
  });

  const coupons = couponsData?.coupons || [];
  const pagination = couponsData?.pagination;
  const totalPages = pagination?.totalPages || 1;

  const form = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      code: "",
      discountType: "percentage",
      discountValue: 0,
    },
  });

  const discountType = form.watch("discountType");

  const createMutation = useMutation({
    mutationFn: createCouponMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
      toast.success("Coupon created successfully");
      form.reset();
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create coupon");
    },
  });

  const toggleMutation = useMutation({
    mutationFn: toggleCouponActiveMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update coupon");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCouponMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-coupons"] });
      toast.success("Coupon deleted");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete coupon");
    },
  });

  const onSubmit = (values: CouponFormValues) => {
    const payload = {
      ...values,
      expiresAt: values.expiresAt
        ? new Date(values.expiresAt).toISOString()
        : undefined,
    } as CouponSubmitValues;

    createMutation.mutate(payload);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-40" />
            <Skeleton className="mt-1 h-4 w-56" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
        <Card className="border-border">
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {[
                      "Code",
                      "Discount",
                      "Used",
                      "Expires",
                      "Status",
                      "Actions",
                    ].map((h) => (
                      <TableHead key={h} className="px-6 py-2">
                        <Skeleton className="h-4 w-24" />
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {Array.from({ length: 6 }).map((_, j) => (
                        <TableCell key={j} className="px-6 py-4">
                          <Skeleton className="h-4 w-full max-w-32" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Coupons</h2>
          <p className="text-muted-foreground">
            Create and manage discount codes for checkout.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="flex items-center gap-2 px-4!">
              <Plus className="h-4 w-4" />
              New Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-lg">Create coupon</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="SAVE20"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount type</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="percentage">
                              Percentage
                            </SelectItem>
                            <SelectItem value="fixed">Fixed amount</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountValue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {discountType === "percentage"
                            ? "Percent off"
                            : "Amount off"}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder={
                              discountType === "percentage" ? "20" : "10"
                            }
                            {...field}
                            value={field.value as number | string}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {discountType === "percentage" && (
                  <FormField
                    control={form.control}
                    name="maxDiscountAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max discount amount (optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="e.g. 50"
                            {...field}
                            value={field.value as number | string | undefined}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expires on (optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button
                    size="lg"
                    type="submit"
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? "Creating..." : "Create coupon"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>All Coupons ({pagination?.total || 0})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-2">Code</TableHead>
                  <TableHead className="px-2 py-2">Discount</TableHead>
                  <TableHead className="px-2 py-2">Used</TableHead>
                  <TableHead className="px-2 py-2">Expires</TableHead>
                  <TableHead className="px-2 py-2">Status</TableHead>
                  <TableHead className="px-2 py-2 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="h-24 text-center text-muted-foreground"
                    >
                      No coupons found.
                    </TableCell>
                  </TableRow>
                ) : (
                  coupons.map((coupon) => (
                    <TableRow
                      key={coupon._id}
                      className="hover:bg-muted/30 text-[13px]!"
                    >
                      <TableCell className="px-4 py-2 font-mono font-medium">
                        {coupon.code}
                      </TableCell>
                      <TableCell className="px-2 py-2 font-semibold text-foreground">
                        {coupon.discountType === "percentage"
                          ? `${coupon.discountValue}% off`
                          : `$${coupon.discountValue} off`}
                        {coupon.maxDiscountAmount ? (
                          <span className="ml-1 text-xs font-normal text-muted-foreground">
                            (max ${coupon.maxDiscountAmount})
                          </span>
                        ) : null}
                      </TableCell>
                      <TableCell className="px-2 py-2 text-muted-foreground">
                        {coupon.usedBy.length}
                      </TableCell>
                      <TableCell className="px-2 py-2 text-muted-foreground">
                        {coupon.expiresAt
                          ? new Date(coupon.expiresAt).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="px-2 py-2">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={coupon.isActive}
                            disabled={toggleMutation.isPending}
                            onCheckedChange={() =>
                              toggleMutation.mutate(coupon._id)
                            }
                          />
                          <Badge
                            variant={
                              coupon.isActive ? "default" : "destructive"
                            }
                            className={
                              coupon.isActive
                                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                                : ""
                            }
                          >
                            {coupon.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="px-2 py-2 text-right">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-muted-foreground hover:text-destructive"
                          disabled={deleteMutation.isPending}
                          onClick={() => deleteMutation.mutate(coupon._id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-4 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex-1 text-sm text-muted-foreground">
              Page {pagination?.page || 1} of {totalPages} (
              {pagination?.total || 0} coupons)
            </p>
            <Pagination className="flex-1 justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pagination?.hasPrevPage) setPage(page - 1);
                    }}
                    className={
                      !pagination?.hasPrevPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="flex h-9 w-9 items-center justify-center text-sm font-medium">
                    {page}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (pagination?.hasNextPage) setPage(page + 1);
                    }}
                    className={
                      !pagination?.hasNextPage
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
