/*
 * @(#)OrderService.java
 *
 */


package by.company.store.services;

import by.company.soap.PriceServiceService;
import by.company.store.enums.OrderStatus;
import by.company.store.models.Order;
import by.company.store.models.products.Product;
import by.company.store.repositories.OrderRepository;
import by.company.soap.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Service for orders
 *
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final PriceService priceService;

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
        return boughtOrders;
    }


    public Order findById(String orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public void deleteById(String orderId) {
        orderRepository.deleteById(orderId);
    }

    public void save(Order order) {
        orderRepository.save(order);
    }

    public void update(Order order) {
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
                return order;
            }
        }
        return null;
    }
}
