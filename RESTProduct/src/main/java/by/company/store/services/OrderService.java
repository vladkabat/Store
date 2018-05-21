/*
 * @(#)OrderService.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */


package by.company.store.services;

import by.company.soap.PriceServiceService;
import by.company.store.enums.OrderStatus;
import by.company.store.models.Order;
import by.company.store.models.products.Product;
import by.company.store.repositories.OrderRepository;
import by.company.soap.PriceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for orders
 *
 * @author Kabat Vlad
 * @version 1.0.0 03 Oct 2017
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PriceService priceService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
        this.priceService = new PriceServiceService().getPriceServicePort();
    }

    public List<Order> findAll(){
        return orderRepository.findAll();
    }

    public void updateProduct(Product product){
        for(Order order : findAll()){
            if(order.getProduct().getId().equals(product.getId())) {
                order.setProduct(product);
                update(order);
            }
        }
    }

    /**
     * Get all not bought orders from db and set prices for products (get prices from SOAP)
     */
    public List<Order> findNotBoughtOrders(String userId) {
        List<Order> orders = orderRepository.findByUserIdAndStatus(userId, OrderStatus.NOT_BOUGHT);
        List<Order> notBoughtOrders = new ArrayList<>();
        for (Order order : orders) {
            Product product = order.getProduct();
            double price = priceService.getPriceByProductId(product.getId());
            product.setPrice(price);
            notBoughtOrders.add(order);
        }
        logger.info("User get {} not bought orders", orders.size());
        return notBoughtOrders;
    }

    /**
     * Get all bought orders from db and set prices for products (get prices from SOAP)
     */
    public List<Order> findBoughtOrders(String userId) {
        List<Order> orders = orderRepository.findByUserIdAndStatus(userId, OrderStatus.BOUGHT);
        List<Order> boughtOrders = new ArrayList<>();
        for (Order order : orders) {
            Product product = order.getProduct();
            double price = priceService.getPriceByProductId(product.getId());
            product.setPrice(price);
            boughtOrders.add(order);
        }
        logger.info("User get {} bought orders", orders.size());
        return boughtOrders;
    }


    public Order findById(String orderId) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            logger.info("Order {} is found", orderId);
        } else {
            logger.error("Order {} not found", orderId);
        }
        return order;
    }

    public void deleteById(String orderId) {
        logger.info("Order {} is deleted", orderId);
        orderRepository.deleteById(orderId);
    }

    public void save(Order order) {
        logger.info("Order {} is saved", order.getId());
        orderRepository.save(order);
    }

    public void update(Order order) {
        logger.info("Order {} is updated", order.getId());
        orderRepository.save(order);
    }

    public Order findBoughtOrderByProductIdAndUserId(String productId, String userId) {
        List<Order> orders = findBoughtOrders(userId);
        return findOrderByProductId(orders, productId);
    }

    public Order findNotBoughtOrderByProductIdAndUserId(String productId, String userId) {
        List<Order> orders = findNotBoughtOrders(userId);
        return findOrderByProductId(orders, productId);
    }

    // Get all orders by id product
    private Order findOrderByProductId(List<Order> orders, String productId) {
        for (Order order : orders) {
            if (order.getProduct().getId().equals(productId)) {
                logger.info("Order {} is found", order.getId());
                return order;
            }
        }
        logger.error("Order not found");
        return null;
    }
}
