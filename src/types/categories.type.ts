

// export type CategoryType = {
//       _id:string;
//       name: string;
//       imageUrl: string;
//       description: string;
//       isActive: boolean
//       slug: string;
//       createdAt:string;
//       updatedAt: string
// }
export type CategoryResponseType = {
    message: string;
     categories: CategoryType[]
};

// new updated code

export type CategoryType = {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SubCategoryType = {
  _id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  description?: string;
  isActive: boolean;
  categoryId: string | { _id: string; name: string; slug: string }; // populated or raw ID
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoryPayload = {
  name: string;
  imageUrl?: string | null;
  description?: string;
};

export type UpdateCategoryPayload = Partial<CreateCategoryPayload> & {
  isActive?: boolean;
};

export type CreateSubCategoryPayload = {
  name: string;
  categoryId: string;
  imageUrl?: string | null;
  description?: string;
};

export type UpdateSubCategoryPayload = Partial<CreateSubCategoryPayload> & {
  isActive?: boolean;
};