/*
 * @(#)ManufacturerRepository.java
 *
 */



package by.company.store.repositories;

import by.company.store.models.Manufacturer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for model {@link Manufacturer} extends {@link MongoRepository} interface
 *
 */
@Repository
public interface ManufacturerRepository extends MongoRepository<Manufacturer, String> {
    Optional<Manufacturer> findById(String id);
}
