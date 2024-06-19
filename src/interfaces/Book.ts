export interface Book {
  id: number;
  title: string;
  author: string;
  publicationYear: string;
  description: string;
  ISBNNo: string;
  coverImage: string;
  quantity: number;
  genre: string[];
  createdAt: Date;
  updatedAt: Date;
}
