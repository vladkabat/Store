/*
 * @(#)OrderRepository.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.repositories;

import by.company.store.enums.OrderStatus;
import by.company.store.models.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository for model 'Order' extends {@link MongoRepository} interface
 *
 * @version 1.0.0 19 Sep 2017
 * @author Kabat Vlad
 */
@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findByUserIdAndStatus(String userId, OrderStatus status);
}
