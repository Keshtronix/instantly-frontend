import AccountAddressesPage from "@/pages/account/addresses";
import AccountProfilePage from "@/pages/account/profile";
import AccountReviewsPage from "@/pages/account/reviews";
import CheckoutPage from "@/pages/checkout";
import HomePage from "@/pages/home";
import OrderTrackingPage from "@/pages/orders/order-tracking";
import OrdersPage from "@/pages/orders/orders";
import ProductDetailPage from "@/pages/product-detail";
import ProductsPage from "@/pages/products";
import SearchResultPage from "@/pages/search-results";
import AdminDashboardPage from "@/pages/admin/dashboard";
import AdminOrdersPage from "@/pages/admin/orders";
import AdminProductsPage from "@/pages/admin/products";
import AdminNewProductPage from "@/pages/admin/new-product";
import WishlistPage from "@/pages/account/wishlist";
import AdminCouponsPage from "@/pages/admin/coupons";
import AdminCustomersPage from "@/pages/admin/customers";
import AdminCategoriesPage from "@/pages/admin/categories";
import AdminEditProductPage from "@/pages/admin/edit-product";

// export const AUTH_ROUTES = {
//   SIGN_IN: '/',
//   SIGN_UP: '/',
// };

export const PUBLIC_ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:slug",
  SEARCH_RESULTS: "/search-results",
};

export const PROTECTED_ROUTES = {
  CHECKOUT: "/checkout",
  ORDERS: "/orders",
  ORDER_TRACKING: "/orders/:orderId",
  ACCOUNT_REVIEWS: "/account/reviews",
  ACCOUNT_ADDRESSES: "/account/addresses",
  WISHLIST: "/account/wishlist",
  ACCOUNT_PROFILE: "/account/profile",
  ADMIN_DASHBOARD: "/admin",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_PRODUCTS_NEW: "/admin/products/new",
  ADMIN_PRODUCTS_EDIT: "/admin/products/:id/edit",
  // ADMIN_PRODUCT_DETAIL: (id: string) => `/admin/products/${id}`,
  // ADMIN_PRODUCT_STATUS: (id: string) => `/admin/products/${id}/status`,
  // ADMIN_PRODUCT_IMAGES: (id: string) => `/admin/products/${id}/images`,
  // ADMIN_PRODUCT_IMAGE_DETAIL: (productId: string, imageId: string) =>,
  ADMIN_COUPONS: "/admin/coupons",
  ADMIN_CUSTOMERS: "/admin/customers",
  ADMIN_CUSTOMER_DETAIL: (id: string) => `/admin/customers/${id}`,
  ADMIN_CUSTOMER_STATUS: (id: string) => `/admin/customers/${id}/status`,
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_CATEGORY_DETAIL: (id: string) => `/admin/categories/${id}`,
  ADMIN_SUB_CATEGORIES: "/admin/sub-categories",
  ADMIN_SUB_CATEGORY_DETAIL: (id: string) => `/admin/sub-categories/${id}`,
};

// export const authRouthsPaths: Array<{ path: string; element: React.ComponentType }> = [];

export const publicRoutesPaths = [
  {
    path: PUBLIC_ROUTES.HOME,
    element: HomePage,
  },
  {
    path: PUBLIC_ROUTES.PRODUCTS,
    element: ProductsPage,
  },
  {
    path: PUBLIC_ROUTES.PRODUCT_DETAIL,
    element: ProductDetailPage,
  },
  {
    path: PUBLIC_ROUTES.SEARCH_RESULTS,
    element: SearchResultPage,
  },
];

export const protectedRoutesPaths = [
  {
    path: PROTECTED_ROUTES.CHECKOUT,
    element: CheckoutPage,
  },
  {
    path: PROTECTED_ROUTES.ORDERS,
    element: OrdersPage,
    account: true,
  },
  {
    path: PROTECTED_ROUTES.ORDER_TRACKING,
    element: OrderTrackingPage,
    account: true,
  },
  {
    path: PROTECTED_ROUTES.ACCOUNT_REVIEWS,
    element: AccountReviewsPage,
    account: true,
  },
  {
    path: PROTECTED_ROUTES.ACCOUNT_ADDRESSES,
    element: AccountAddressesPage,
    account: true,
  },
  {
    path: PROTECTED_ROUTES.ACCOUNT_PROFILE,
    element: AccountProfilePage,
    account: true,
  },
  {
    path: PROTECTED_ROUTES.WISHLIST,
    element: WishlistPage,
    account: true,
  },
];

export const adminRoutesPaths = [
  {
    path: PROTECTED_ROUTES.ADMIN_DASHBOARD,
    element: AdminDashboardPage,
  },
  {
    path: PROTECTED_ROUTES.ADMIN_ORDERS,
    element: AdminOrdersPage,
  },
  {
    path: PROTECTED_ROUTES.ADMIN_PRODUCTS,
    element: AdminProductsPage,
  },
  {
    path: PROTECTED_ROUTES.ADMIN_PRODUCTS_NEW,
    element: AdminNewProductPage,
  },
  {
    path: PROTECTED_ROUTES.ADMIN_PRODUCTS_EDIT,
    element: AdminEditProductPage,
  },
  {
    path: PROTECTED_ROUTES.ADMIN_COUPONS,
    element: AdminCouponsPage,
  },
  {
    path: PROTECTED_ROUTES.ADMIN_CUSTOMERS,
    element: AdminCustomersPage,
  },
  {
    path: PROTECTED_ROUTES.ADMIN_CATEGORIES,
    element: AdminCategoriesPage,
  },
  // {
  //   path: PROTECTED_ROUTES.ADMIN_CATEGORY_DETAIL,
  //   element: AdminCategoryDetailPage,
  // },
  // {
  //   path: PROTECTED_ROUTES.ADMIN_SUB_CATEGORIES,
  //   element: AdminSubCategoriesPage,
  // },
  // {
  //   path: PROTECTED_ROUTES.ADMIN_SUB_CATEGORY_DETAIL,
  //   element: AdminSubCategoryDetailPage,
  // },
];
