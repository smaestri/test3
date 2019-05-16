package com.udemy.sharebook.user;

import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
public class UserController {

    // get user
    @GetMapping(value="/users/{userId}")
    public User getUser(@PathVariable("userId") String userId) {

        User user = new User();
        user.setUserId(userId);
        user.setFirstName("sylvain");
        user.setLastName("maestri");

        return user;

    }

    // creer user
    @PostMapping(value="/users")
    public User getUser(@Valid @RequestBody User user) {
       //TODO to implement
        return user;

    }

    //delete user
    @DeleteMapping(value="/users/{userId}")
    public void deleteUser(@PathVariable("userId") String userId) {
        //TODO to implement
    }
}
