package com.udemy.sharebook.user;

import com.udemy.sharebook.configuration.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // get user
    @GetMapping(value="/users/{userId}")
    public User getUser(@PathVariable("userId") String userId) {
        Optional<User> user = userRepository.findById(Integer.valueOf(userId));
        return user.get();

    }

    // creer user
    @PostMapping(value="/users")
    public ResponseEntity getUser(@Valid @RequestBody User user) {

        List<User> listUser = this.userRepository.findByEmail(user.getEmail());
        if(listUser != null && listUser.size() > 0) {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
        userRepository.save(user);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    //delete user
    @DeleteMapping(value="/users/{userId}")
    public void deleteUser(@PathVariable("userId") String userId) {
        Optional<User> user = userRepository.findById(Integer.valueOf(userId));
        userRepository.delete(user.get());
    }

    @GetMapping("/isAuthenticated")
    public Integer isAuthenticated() {
        User userSpring = getPrincipal();
        if (userSpring != null) {
            return userSpring.getId();
        }
        return 0;
    }

    private static User getPrincipal() {

        User user = null;
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            return null;
        }

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof CustomUserDetailsService.UserPrincipal) {
            user = ((CustomUserDetailsService.UserPrincipal) principal).getUser();

        }
        return user;
    }

}
