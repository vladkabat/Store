/*
 * @(#)FrequencyConverterRepository.java
 *
 */



package by.company.store.repositories.products;

import by.company.store.models.products.FrequencyConverter;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for model {@link FrequencyConverter} extends {@link MongoRepository} interface
 *
 */
@Repository
public interface FrequencyConverterRepository extends MongoRepository<FrequencyConverter, String> {
    Optional<FrequencyConverter> findById(String id);
}
