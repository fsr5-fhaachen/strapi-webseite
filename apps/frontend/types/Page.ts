export interface PagesResponse {
  data: [Page];
}

export interface PageResponse {
  data: Page;
}

export interface Page {
  id: number;
  attributes: {
    title: string;
    name: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}
