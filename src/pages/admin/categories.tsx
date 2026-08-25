import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategoriesQueryFn,
  createCategoryMutationFn,
  updateCategoryMutationFn,
  deleteCategoryMutationFn,
  getSubCategoriesQueryFn,
  createSubCategoryMutationFn,
  updateSubCategoryMutationFn,
  deleteSubCategoryMutationFn,
} from "@/lib/api"; // adjust path
import type { CategoryType, SubCategoryType } from "@/types/categories.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { AxiosError } from "axios";

type CategoryFormState = { name: string; description: string; imageUrl: string };
const emptyForm: CategoryFormState = { name: "", description: "", imageUrl: "" };

export default function CategoriesPage() {
  const queryClient = useQueryClient();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryType | null>(null);
  const [categoryForm, setCategoryForm] = useState<CategoryFormState>(emptyForm);

  const [subCategoryDialogOpen, setSubCategoryDialogOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<SubCategoryType | null>(null);
  const [subCategoryForm, setSubCategoryForm] = useState<CategoryFormState>(emptyForm);

  // --- Categories ---
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["admin-categories"],
    queryFn: getCategoriesQueryFn,
  });
  const categories: CategoryType[] = categoriesData?.categories ?? [];

  const createCategoryMutation = useMutation({
    mutationFn: createCategoryMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category created");
      setCategoryDialogOpen(false);
    },
    onError: () => toast.error("Failed to create category"),
  });

  const updateCategoryMutation = useMutation({
    mutationFn: updateCategoryMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
      toast.success("Category updated");
      setCategoryDialogOpen(false);
    },
    onError: () => toast.error("Failed to update category"),
  });

  // const deleteCategoryMutation = useMutation({
  //   mutationFn: deleteCategoryMutationFn,
  //   onSuccess: (_data, deletedId) => {
  //     queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
  //     if (selectedCategoryId === deletedId) setSelectedCategoryId(null);
  //     toast.success("Category deleted");
  //   },
  //   onError: () => toast.error("Failed to delete category (it may still have sub-categories)"),
  // });

  const deleteCategoryMutation = useMutation({
  mutationFn: deleteCategoryMutationFn,
  onSuccess: (_data, deletedId) => {
    queryClient.invalidateQueries({ queryKey: ["admin-categories"] });
    if (selectedCategoryId === deletedId) setSelectedCategoryId(null);
    toast.success("Category deleted");
  },
  onError: (error: AxiosError<{ message?: string }>) => {
    toast.error(error.response?.data?.message ?? "Failed to delete category");
  },
});

  // --- Sub-categories (only fetched once a category is selected) ---
  const { data: subCategoriesData, isLoading: subCategoriesLoading } = useQuery({
    queryKey: ["admin-subcategories", selectedCategoryId],
    queryFn: () => getSubCategoriesQueryFn({ categoryId: selectedCategoryId! }),
    enabled: !!selectedCategoryId,
  });
  const subCategories: SubCategoryType[] = subCategoriesData?.subCategories ?? [];

  const createSubCategoryMutation = useMutation({
    mutationFn: createSubCategoryMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-subcategories", selectedCategoryId] });
      toast.success("Sub-category created");
      setSubCategoryDialogOpen(false);
    },
    onError: () => toast.error("Failed to create sub-category"),
  });

  const updateSubCategoryMutation = useMutation({
    mutationFn: updateSubCategoryMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-subcategories", selectedCategoryId] });
      toast.success("Sub-category updated");
      setSubCategoryDialogOpen(false);
    },
    onError: () => toast.error("Failed to update sub-category"),
  });

  const deleteSubCategoryMutation = useMutation({
    mutationFn: deleteSubCategoryMutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-subcategories", selectedCategoryId] });
      toast.success("Sub-category deleted");
    },
    onError: () => toast.error("Failed to delete sub-category"),
  });

  // --- Handlers ---
  const openCreateCategory = () => {
    setEditingCategory(null);
    setCategoryForm(emptyForm);
    setCategoryDialogOpen(true);
  };

  const openEditCategory = (category: CategoryType) => {
    setEditingCategory(category);
    setCategoryForm({
      name: category.name,
      description: category.description ?? "",
      imageUrl: category.imageUrl ?? "",
    });
    setCategoryDialogOpen(true);
  };

  const submitCategory = () => {
    const payload = {
      name: categoryForm.name,
      description: categoryForm.description || undefined,
      imageUrl: categoryForm.imageUrl || null,
    };
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory._id, data: payload });
    } else {
      createCategoryMutation.mutate(payload);
    }
  };

  const openCreateSubCategory = () => {
    setEditingSubCategory(null);
    setSubCategoryForm(emptyForm);
    setSubCategoryDialogOpen(true);
  };

  const openEditSubCategory = (subCategory: SubCategoryType) => {
    setEditingSubCategory(subCategory);
    setSubCategoryForm({
      name: subCategory.name,
      description: subCategory.description ?? "",
      imageUrl: subCategory.imageUrl ?? "",
    });
    setSubCategoryDialogOpen(true);
  };

  const submitSubCategory = () => {
    if (!selectedCategoryId) return;
    const payload = {
      name: subCategoryForm.name,
      categoryId: selectedCategoryId,
      description: subCategoryForm.description || undefined,
      imageUrl: subCategoryForm.imageUrl || null,
    };
    if (editingSubCategory) {
      updateSubCategoryMutation.mutate({ id: editingSubCategory._id, data: payload });
    } else {
      createSubCategoryMutation.mutate(payload);
    }
  };

  const selectedCategory = categories.find((c) => c._id === selectedCategoryId);

  return (
    <div className="grid grid-cols-[320px_1fr] gap-4 h-full">
      {/* Left: Categories */}
      <div className="border rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Categories</h2>
          <Button size="sm" variant="outline" onClick={openCreateCategory}>
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        {categoriesLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No categories yet</p>
        ) : (
          <ul className="space-y-1">
            {categories.map((category) => (
              <li
                key={category._id}
                className={`flex items-center justify-between rounded-md px-2 py-2 cursor-pointer text-sm ${
                  selectedCategoryId === category._id
                    ? "bg-primary/10 font-medium"
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedCategoryId(category._id)}
              >
                <span className="flex items-center gap-2">
                  {category.name}
                  {!category.isActive && (
                    <Badge variant="secondary" className="text-xs">
                      Inactive
                    </Badge>
                  )}
                </span>
                <span className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditCategory(category);
                    }}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-red-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete "${category.name}"?`)) {
                        deleteCategoryMutation.mutate(category._id);
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right: Sub-categories */}
      <div className="border rounded-lg p-3 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            {selectedCategory ? `Sub-categories of "${selectedCategory.name}"` : "Sub-categories"}
          </h2>
          <Button
            size="sm"
            variant="outline"
            disabled={!selectedCategoryId}
            onClick={openCreateSubCategory}
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        {!selectedCategoryId ? (
          <p className="text-sm text-muted-foreground">Select a category to view its sub-categories</p>
        ) : subCategoriesLoading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : subCategories.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sub-categories yet</p>
        ) : (
          <ul className="space-y-1">
            {subCategories.map((subCategory) => (
              <li
                key={subCategory._id}
                className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  {subCategory.name}
                  {!subCategory.isActive && (
                    <Badge variant="secondary" className="text-xs">
                      Inactive
                    </Badge>
                  )}
                </span>
                <span className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6"
                    onClick={() => openEditSubCategory(subCategory)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-6 w-6 text-red-600"
                    onClick={() => {
                      if (confirm(`Delete "${subCategory.name}"?`)) {
                        deleteSubCategoryMutation.mutate(subCategory._id);
                      }
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category dialog */}
      <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "New Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Name"
              value={categoryForm.name}
              onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
            />
            <Textarea
              placeholder="Description (optional)"
              value={categoryForm.description}
              onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
            />
            <Input
              placeholder="Image URL (optional)"
              value={categoryForm.imageUrl}
              onChange={(e) => setCategoryForm({ ...categoryForm, imageUrl: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={submitCategory}
              disabled={!categoryForm.name || createCategoryMutation.isPending || updateCategoryMutation.isPending}
            >
              {editingCategory ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Sub-category dialog */}
      <Dialog open={subCategoryDialogOpen} onOpenChange={setSubCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSubCategory ? "Edit Sub-category" : "New Sub-category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Name"
              value={subCategoryForm.name}
              onChange={(e) => setSubCategoryForm({ ...subCategoryForm, name: e.target.value })}
            />
            <Textarea
              placeholder="Description (optional)"
              value={subCategoryForm.description}
              onChange={(e) => setSubCategoryForm({ ...subCategoryForm, description: e.target.value })}
            />
            <Input
              placeholder="Image URL (optional)"
              value={subCategoryForm.imageUrl}
              onChange={(e) => setSubCategoryForm({ ...subCategoryForm, imageUrl: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={submitSubCategory}
              disabled={
                !subCategoryForm.name ||
                createSubCategoryMutation.isPending ||
                updateSubCategoryMutation.isPending
              }
            >
              {editingSubCategory ? "Save" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}