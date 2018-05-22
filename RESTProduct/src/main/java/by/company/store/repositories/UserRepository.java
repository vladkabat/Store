/*
 * @(#)UserRepository.java
 *
 */



package by.company.store.repositories;

import by.company.store.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for model {@link User} extends {@link MongoRepository} interface
 *
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
