/*
 * @(#)UserService.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.services;

import by.company.store.enums.Role;
import by.company.store.models.User;
import by.company.store.repositories.UserRepository;
import com.google.common.collect.ImmutableList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for user
 *
 * @version 1.0.0 03 Oct 2017
 * @author Kabat Vlad
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Get user by username
     * @param username username
     * @return if user exist return true else false
     */
    public boolean isUserExist(String username) {
        boolean isExistUser = userRepository.findByUsername(username).
                orElse(null) != null;
        if (isExistUser) {
            logger.info("User '{}' is exist", username);
        } else {
            logger.error("User '{}' not exist", username);
        }

        return isExistUser;
    }

    //save user
    public User save(User user) {
        String password = new BCryptPasswordEncoder().encode(user.getPassword());
        String username = user.getUsername();
        logger.info("Customer '{}' is saved", username);
        return userRepository.save(User.builder()
                .username(username)
                .password(password)
                .authorities(ImmutableList.of(Role.ROLE_CUSTOMER))
                .accountNonExpired(true)
                .accountNonLocked(true)
                .credentialsNonExpired(true)
                .enabled(true)
                .build());
    }

    /**
     * Find user in db
     * @param username username
     * @param password password user
     * @return if user exist return user else null
     */
    public User loginUser(String username, String password) {
        User loginUser = userRepository.findByUsername(username).orElse(null);
        if ((loginUser != null) && (new BCryptPasswordEncoder().matches(password, loginUser.getPassword()))) {
            logger.info("User '{}' is log in", username);
            return loginUser;
        }
        logger.error("User '{}' not logged in", username);
        return null;
    }
}
