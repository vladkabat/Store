/*
 * @(#)StoreUserDetailsService.java
 *
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
