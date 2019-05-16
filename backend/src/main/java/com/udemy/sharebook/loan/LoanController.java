package com.udemy.sharebook.loan;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
public class LoanController {

    // mes emprunts
    @GetMapping(value = "/users/{userId}/loans")
    public List<Loan> getLoans(@PathVariable("userId") String userId) {
        //TODO to implement
        Loan loan = new Loan();
        loan.setAskDate(new Date());
        return Arrays.asList(loan);
    }

    // Créer un emprunt
    @PostMapping(value = "/users/{userId}/loans/{bookId}")
    @ResponseStatus(value = HttpStatus.CREATED)
    public Loan createLoan(@PathVariable("userId") String userId,
                           @PathVariable("bookId") String bookId) {

        //TODO to implement
        Loan loan = new Loan();
        loan.setAskDate(new Date());
        return loan;

    }

    // Clore un emprunt
    @DeleteMapping(value = "/loans/{loanId}")
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void deleteLoan(@PathVariable("loanId") String loanId) {

        //TODO to implement
    }
}
