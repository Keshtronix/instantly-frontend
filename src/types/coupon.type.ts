export type DiscountType = "percentage" | "fixed";

export type CouponType = {
  _id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscountAmount?: number;
  isActive: boolean;
  expiresAt?: string;
  usedBy: string[];
  createdAt: string;
  updatedAt: string;
};

export type GetCouponsResponse = {
  message: string;
  coupons: CouponType[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export type CreateCouponInput = {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscountAmount?: number;
  expiresAt?: string;
};

export type CouponResponse = {
  message: string;
  coupon: CouponType;
};

export type ApplyCouponResponse = {
  message: string;
  couponId: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
};