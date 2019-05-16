import { BookModel } from './bookmodel';
import { UserModel } from './usermodel';

export class LoanModel {
    askDate: Date
    book: BookModel
    borrower: UserModel
    lender: UserModel
    closeDate: Date
}