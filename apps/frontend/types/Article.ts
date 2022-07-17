import { CategoryResponse } from './Category';
import { MediaResponse } from './Media';

export interface ArticlesResponse {
  data: [Article];
}

export interface ArticleResponse {
  data: Article;
}

export interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    category?: CategoryResponse;
    message: string;
    slug?: string;
    banner?: MediaResponse;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}
