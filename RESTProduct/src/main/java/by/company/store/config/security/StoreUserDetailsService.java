/*
 * @(#)StoreUserDetailsService.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.config.security;

import by.company.store.models.User;
import by.company.store.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service for get user from db
 * implements {@link UserDetailsService} interface
 *
 * @version 1.0.0 19 Oct 2017
 * @author Kabat Vlad
 */
@Service
public class StoreUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public StoreUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Find user in db
     *
     * @param username name user
     * @return user if found
     * @throws UsernameNotFoundException throw exception with message if user not found
     */
    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("Could not find user."));
    }
}
