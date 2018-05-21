/*
 * @(#)Order.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */


package by.company.store.models;

import by.company.store.enums.OrderStatus;
import by.company.store.models.products.Product;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model 'Order'
 *
 * @author Kabat Vlad
 * @version 1.0.0 19 Sep 2017
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "orders")
public class Order extends AbstractEntity<String> {

    private OrderStatus status;
    private String userId;
    private Product product;
    private int amount;
}
