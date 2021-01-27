//package com.udemy.sharebook.borrow;
//
//import com.udemy.sharebook.book.Book;
//import com.udemy.sharebook.book.BookController;
//import com.udemy.sharebook.book.BookRepository;
//import com.udemy.sharebook.book.BookStatus;
//import com.udemy.sharebook.user.User;
//import com.udemy.sharebook.user.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//
//import java.security.Principal;
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//public class BorrowController {
//
//    @Autowired
//    private BorrowRepository borrowRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private BookRepository bookRepository;
//
//    // mes emprunts
//    @GetMapping(value = "/borrows")
//    public List<Borrow> getBorrows(Principal principal) {
//        Integer userId = BookController.getUserConnectedId(principal);
//        List<Borrow> listBorrows = borrowRepository.findByBorrowerId(Integer.valueOf(userId));
//
//        return listBorrows;
//    }
//
//    // Créer un emprunt
//    @PostMapping(value = "/borrows/{bookId}")
//    @ResponseStatus(value = HttpStatus.CREATED)
//    public Borrow createBorrow(@PathVariable("bookId") String bookId, Principal principal) {
//        Integer userId = BookController.getUserConnectedId(principal);
//        Optional<User> borrower = userRepository.findById(Integer.valueOf(userId));
//        Optional<Book> book = this.bookRepository.findById(Integer.valueOf(bookId));
//
//        if (borrower.isPresent() && book.isPresent()) {
//            Book book1 = book.get();
//            User lender = book1.getUser();
//            Borrow borrow = new Borrow();
//            borrow.setAskDate(new Date());
//            borrow.setBook(book1);
//            borrow.setBorrower(borrower.get());
//            borrow.setLender(lender);
//            borrowRepository.save(borrow);
//
//            book1.setStatus(BookStatus.BORROWED);
//            bookRepository.save(book1);
//
//            return borrow;
//
//        }
//
//        return null;
//
//    }
//
//    // Clore un emprunt
//    @DeleteMapping(value = "/borrows/{borrowId}")
//    @ResponseStatus(value = HttpStatus.NO_CONTENT)
//    public void deleteBorrow(@PathVariable("borrowId") String borrowId) {
//
//        Borrow borrow = this.borrowRepository.findById(Integer.valueOf(borrowId)).get();
//        borrow.setCloseDate(new Date());
//        borrowRepository.save(borrow);
//
//        Book book1 = borrow.getBook();
//        book1.setStatus(BookStatus.FREE);
//        bookRepository.save(book1);
//
//    }
//}
