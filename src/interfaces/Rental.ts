import { Book } from "./Book";
import { Customer } from "./Customer";

export interface Rental {
  id: number;
  book: Book;
  customer: Customer;
  rentedAt: Date;
  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
