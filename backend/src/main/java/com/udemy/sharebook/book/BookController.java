package com.udemy.sharebook.book;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
public class BookController {

    // afficher les livres disponibles
    @GetMapping(value = "/users/{userId}/books/status/{status}")
    public List<Book> getBookWithStatus(@PathVariable("userId") String userId,
                                        @PathVariable("status") String statusStr) {
        //TODO to implement
        Book book = new Book("bookname");
        book.setCategory("mycategory");
        return Arrays.asList(book);
    }

    // get my books
    @GetMapping(value = "/users/{userId}/books")
    public List<Book> getMyBooks(@PathVariable("userId") String userId) {
        //TODO to implement
        Book book = new Book("bookname");
        List<Book> books = Arrays.asList(book);
        return books;
    }

    // creer un livre
    @PostMapping(value = "/users/{userId}/books")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Book createBookFoorUser(@PathVariable("userId") String userId, @Valid @RequestBody Book book) {
        //TODO to implement
        return book;
    }

    // supprimer un livre
    @DeleteMapping(value = "/books/{bookId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteBook(@PathVariable("bookId") String bookId) {
        //TODO to implement

    }

}
