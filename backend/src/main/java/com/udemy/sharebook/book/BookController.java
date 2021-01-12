package com.udemy.sharebook.book;

import com.udemy.sharebook.configuration.CustomUserDetailsService;
import com.udemy.sharebook.borrow.Borrow;
import com.udemy.sharebook.borrow.BorrowRepository;
import com.udemy.sharebook.user.User;
import com.udemy.sharebook.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.List;
import java.util.Optional;

@RestController
public class BookController {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BorrowRepository borrowRepository;

    public static Integer getUserIdFromPrincipal(Principal principal) {

        if (!(principal instanceof UsernamePasswordAuthenticationToken)) {
            throw new RuntimeException(("User not found"));
        }
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
        Integer userId = ((CustomUserDetailsService.UserPrincipal)token.getPrincipal()).getUser().getId();

        return userId;
    }

    // afficher les livres disponibles / mybooks
    @GetMapping(value = "/books")
    public ResponseEntity freeBooks(Principal principal, @RequestParam(required = false) BookStatus status) {

        Integer userId = this.getUserIdFromPrincipal(principal);

        List<Book> listBook;
        if(StringUtils.isEmpty(status)) {
            listBook = bookRepository.findByUserIdAndDeletedFalse(Integer.valueOf(userId));
        } else {
            listBook = bookRepository.findByStatusAndUserIdNotAndDeletedFalse(status, userId);
        }

        return new ResponseEntity(listBook, HttpStatus.OK);

    }


    // get book
    @GetMapping(value = "/books/{bookId}")
    public ResponseEntity getUser(@PathVariable("bookId") String bookId) {
        Optional<Book> book = bookRepository.findById(Integer.parseInt(bookId));
        return new ResponseEntity(book, HttpStatus.OK);

    }

    // get categories
    @GetMapping(value = "/categories")
    public ResponseEntity getCategories() {
        return new ResponseEntity(categoryRepository.findAll(), HttpStatus.OK);

    }

    // update book
    @PutMapping(value = "/books/{bookId}")
    public ResponseEntity updateBook(@PathVariable("bookId") String bookId, @Valid @RequestBody Book book, Principal principal) {

        Optional<Book> bookToUpdate = bookRepository.findById(Integer.parseInt(bookId));
        Optional<Category> cat = this.categoryRepository.findById(book.getCategoryId());

        // check that the book belongs to user connected
        Integer userId = this.getUserIdFromPrincipal(principal);
        if(bookToUpdate.isPresent() && bookToUpdate.get().getId() != userId) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        if (bookToUpdate.isPresent()) {
            if (cat.isPresent()) {
                book.setCategory(cat.get());
            }
            Book bookToSave = bookToUpdate.get();
            bookToSave.setCategory(book.getCategory());
            bookToSave.setName(book.getName());
            bookRepository.save(bookToSave);
            return new ResponseEntity(bookToSave, HttpStatus.OK);
        }

        return new ResponseEntity(null, HttpStatus.BAD_REQUEST);

    }

    // creer un livre
    @PostMapping(value = "/books")
    @ResponseStatus(value = HttpStatus.CREATED)
    public ResponseEntity createBookFoorUser( @Valid @RequestBody Book book, Principal principal) {

        Integer userId = this.getUserIdFromPrincipal(principal);
        Optional<User> user = userRepository.findById(Integer.valueOf(userId));
        Optional<Category> cat = this.categoryRepository.findById(book.getCategoryId());
        // check that the book belongs to user connected

        if (cat.isPresent()) {
            book.setCategory(cat.get());
        } else {
            return new ResponseEntity("You must provide a category", HttpStatus.BAD_REQUEST);
        }
        book.setDeleted(false);
        book.setStatus(BookStatus.FREE);
        book.setUser(user.get());
        bookRepository.save(book);
        return new ResponseEntity(book, HttpStatus.CREATED);
    }

    // supprimer un livre
    @DeleteMapping(value = "/books/{bookId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public ResponseEntity deleteBook(@PathVariable("bookId") String bookId, Principal principal) {

        Integer userId = this.getUserIdFromPrincipal(principal);
        Book bookToDelete = this.bookRepository.findById(Integer.valueOf(bookId)).get();
        if(bookToDelete != null && bookToDelete.getId() != userId) {
            return new ResponseEntity(HttpStatus.FORBIDDEN);
        }
        List<Borrow> borrows = this.borrowRepository.findByBookId(Integer.valueOf(bookId));

        for (Borrow borrow : borrows) {
            if (borrow.getCloseDate() == null) {
                User borrower = borrow.getBorrower();
                return new ResponseEntity(borrower, HttpStatus.CONFLICT);
            }

        }

        bookToDelete.setDeleted(true);
        bookRepository.save(bookToDelete);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
