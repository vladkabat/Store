/*
 * @(#)EngineRepository.java
 *
 */



package by.company.store.repositories.products;

import by.company.store.models.products.Engine;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for model {@link Engine} extends {@link MongoRepository} interface
 *
 */
@Repository
public interface EngineRepository extends MongoRepository<Engine, String> {
    Optional<Engine> findById(String id);
}
