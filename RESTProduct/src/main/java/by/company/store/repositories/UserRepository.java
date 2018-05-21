/*
 * @(#)UserRepository.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.repositories;

import by.company.store.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for model 'User' extends {@link MongoRepository} interface
 *
 * @version 1.0.0 19 Sep 2017
 * @author Kabat Vlad
 */
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
}
