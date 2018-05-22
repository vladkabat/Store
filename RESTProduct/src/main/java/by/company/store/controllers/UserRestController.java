/*
 * @(#)UserRestController.java
 *
 */



package by.company.store.controllers;

import by.company.store.models.User;
import by.company.store.services.UserService;
import by.company.store.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Rest controller for users
 *
 */
@RestController
@RequestMapping("users")
public class UserRestController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserService userService;

    @Autowired
    public UserRestController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping()
    public ResponseEntity registration(@RequestBody User user){
        if (userService.isUserExist(user.getUsername())) {
            String message = "User '" + user.getUsername() + "' not registered!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.CONFLICT);
        } else {
            User registrationUser = userService.save(user);
            logger.info("User '{}' registered", registrationUser.getUsername());
            return new ResponseEntity<>(registrationUser, HttpStatus.CREATED);
        }
    }

    @GetMapping()
    public ResponseEntity login(@RequestParam String username, @RequestParam String password){
        User user = userService.loginUser(username, password);
        if (user != null) {
            logger.info("User '{}' login", user.getUsername());
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            String message = "Incorrect login or password!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        }
    }
}
