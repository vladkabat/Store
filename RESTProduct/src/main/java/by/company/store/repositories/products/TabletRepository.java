/*
 * @(#)TabletRepository.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.repositories.products;

import by.company.store.models.products.FrequencyConverter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for model 'FrequencyConverter' extends {@link MongoRepository} interface
 *
 * @version 1.0.0 19 Sep 2017
 * @author Kabat Vlad
 */
@Repository
public interface TabletRepository extends MongoRepository<FrequencyConverter, String> {
    Optional<FrequencyConverter> findById(String id);
}
