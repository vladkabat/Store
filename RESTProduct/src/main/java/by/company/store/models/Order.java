/*
 * @(#)Order.java
 *
 */


package by.company.store.models;

import by.company.store.enums.OrderStatus;
import by.company.store.models.products.Product;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model {@link Order}
 *
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
