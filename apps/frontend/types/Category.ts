export interface CategoriesResponse {
  data: [Category];
}

export interface CategoryResponse {
  data: Category;
}

export interface Category {
  id: number;
  attributes: {
    title: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}
