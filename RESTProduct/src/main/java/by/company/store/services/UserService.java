/*
 * @(#)UserService.java
 *
 */



package by.company.store.services;

import by.company.store.enums.Role;
import by.company.store.models.User;
import by.company.store.repositories.UserRepository;
import com.google.common.collect.ImmutableList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Service for user
 *
 */
@Service
public class UserService {

    private final UserRepository userRepository;

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
        return userRepository.findByUsername(username).orElse(null) != null;
    }

    public User save(User user) {
        String password = new BCryptPasswordEncoder().encode(user.getPassword());
        String username = user.getUsername();
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
            return loginUser;
        }
        return null;
    }
}
