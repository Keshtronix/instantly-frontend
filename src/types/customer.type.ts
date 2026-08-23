import type { OrderType } from "./order.type";

export type CustomerType = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  status: "active" | "suspended" | "banned";
  statusReason?: string | null;
  statusUpdatedAt?: string;
  createdAt: string;
};

export type CustomerPaginationType = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export type CustomersResponseType = {
  customers: CustomerType[];
  total: number;
  page: number;
  pages: number;
};

export type CustomerParams = {
  status?: "active" | "suspended" | "banned";
  search?: string;
  page?: number;
  limit?: number;
};

export type CustomerDetailResponseType = {
  customer: CustomerType;
  orders: OrderType[]; // import from your order.type.ts
};

export type UpdateCustomerPayload = Partial<
  Pick<CustomerType, "name" | "email" | "phone">
>;

export type UpdateCustomerStatusPayload = {
  status: "active" | "suspended" | "banned";
  reason?: string;
};
