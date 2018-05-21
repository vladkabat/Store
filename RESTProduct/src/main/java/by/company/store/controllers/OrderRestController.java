/*
 * @(#)OrderRestController.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */


package by.company.store.controllers;

import by.company.store.enums.OrderStatus;
import by.company.store.models.Order;
import by.company.store.models.User;
import by.company.store.models.products.Product;
import by.company.store.services.OrderService;
import by.company.store.util.CustomErrorType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Rest controller for orders
 *
 * @author Kabat Vlad
 * @version 1.0.0 19 Sep 2017
 */
@RestController
@Secured("ROLE_CUSTOMER")
@RequestMapping("orders")
public class OrderRestController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final OrderService orderService;

    @Autowired
    public OrderRestController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping()
    public ResponseEntity getOrders() {
        String userId = getCustomerId();
        List<Order> orders = orderService.findNotBoughtOrders(userId);
        if (orders.isEmpty()) {
            logger.info("Orders is empty!");
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        logger.info("User get '{}' orders!", orders.size());
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteOrder(@PathVariable String id) {
        String userId = getCustomerId();
        Order order = orderService.findById(id);
        if (order == null) {
            String message = "Order " + id + " not found!";
            logger.error(message);
            return new ResponseEntity<>(CustomErrorType.builder()
                    .errorMessage(message).build(), HttpStatus.NOT_FOUND);
        } else {
            if (userId.equals(order.getUserId())) {
                if (order.getAmount() <= 1) {
                    orderService.deleteById(id);
                    logger.info("Order '{}' is deleted!", id);
                    return new ResponseEntity(HttpStatus.OK);
                } else {
                    order.setAmount(order.getAmount() - 1);
                    orderService.update(order);
                    logger.info("Order '{}' is updated!", id);
                    return new ResponseEntity(HttpStatus.OK);
                }
            } else {
                String message = "No permission to delete!";
                logger.error(message);
                return new ResponseEntity<>(CustomErrorType.builder()
                        .errorMessage(message).build(), HttpStatus.FORBIDDEN);
            }
        }
    }

    @PutMapping("one")
    public ResponseEntity putOrder(@RequestBody Order order) {
        String userId = getCustomerId();
        Order orderInDb = orderService.findNotBoughtOrderByProductIdAndUserId(order.getProduct().getId(), userId);
        if (orderInDb != null) {
            orderInDb.setAmount(orderInDb.getAmount() + 1);
            orderService.update(orderInDb);
            logger.info("Order {} is updated!", orderInDb.getId());
            return new ResponseEntity<>(orderService.findNotBoughtOrders(userId), HttpStatus.OK);
        } else {
            Order createdOrder = createOrder(order.getProduct(), userId, 1);
            orderService.save(createdOrder);
            logger.info("Order {} is saved!", createdOrder.getId());
            return new ResponseEntity<>(orderService.findNotBoughtOrders(userId), HttpStatus.CREATED);
        }
    }

    @PutMapping("many")
    public ResponseEntity putOrders(@RequestBody List<Order> orders) {
        String userId = getCustomerId();
        for (Order order : orders) {
            Order orderInDb = orderService.findNotBoughtOrderByProductIdAndUserId(order.getProduct().getId(), userId);
            if (orderInDb != null) {
                orderInDb.setAmount(order.getAmount());
                orderService.update(orderInDb);
            } else {
                Order createdOrder = createOrder(order.getProduct(), userId, order.getAmount());
                orderService.save(createdOrder);
            }
        }
        logger.info("Orders is saved!");
        return new ResponseEntity<>(orderService.findNotBoughtOrders(userId), HttpStatus.OK);
    }

    private Order createOrder(Product product, String userId, int amount){
        return Order.builder()
                .status(OrderStatus.NOT_BOUGHT)
                .amount(amount)
                .product(product)
                .userId(userId)
                .build();
    }

    private String getCustomerId() {
        return ((User) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal())
                .getId();
    }
}
