import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCustomersQueryFn,
  updateCustomerStatusMutationFn,
} from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner"; // or your existing toast lib
import type { CustomerType } from "@/types/customer.type";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  suspended: "bg-yellow-100 text-yellow-700",
  banned: "bg-red-100 text-red-700",
};

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-customers", { search, status, page }],
    queryFn: () => getCustomersQueryFn({ search, status, page, limit: 20 }),
  });

  const statusMutation = useMutation({
    mutationFn: updateCustomerStatusMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-customers"] });
      toast.success("Customer status updated");
    },
    onError: () => toast.error("Failed to update customer status"),
  });

  const handleStatusChange = (id: string, newStatus: "active" | "suspended" | "banned") => {
    statusMutation.mutate({ id, status: newStatus });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <div className="flex gap-2">
          <Input
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-64"
          />
          <select
            className="border rounded-md px-2 text-sm"
            value={status ?? ""}
            onChange={(e) => {
              setStatus(e.target.value || undefined);
              setPage(1);
            }}
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          ) : data?.customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                No customers found
              </TableCell>
            </TableRow>
          ) : (
            data?.customers.map((customer:CustomerType) => (
              <TableRow key={customer._id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  <Badge className={statusColors[customer.status]}>
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(customer.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {customer.status !== "active" && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(customer._id, "active")}
                        >
                          Reactivate
                        </DropdownMenuItem>
                      )}
                      {customer.status !== "suspended" && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(customer._id, "suspended")}
                        >
                          Suspend
                        </DropdownMenuItem>
                      )}
                      {customer.status !== "banned" && (
                        <DropdownMenuItem
                          onClick={() => handleStatusChange(customer._id, "banned")}
                          className="text-red-600"
                        >
                          Ban (spam)
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination controls - reuse whatever component your Products/Orders table uses */}
    </div>
  );
}