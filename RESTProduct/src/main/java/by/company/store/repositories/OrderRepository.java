/*
 * @(#)OrderRepository.java
 *
 */



package by.company.store.repositories;

import by.company.store.enums.OrderStatus;
import by.company.store.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for model {@link Order} extends {@link MongoRepository} interface
 *
 */
@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserIdAndStatus(String userId, OrderStatus status);
}
