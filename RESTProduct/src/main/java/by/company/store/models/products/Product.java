/*
 * @(#)Product.java
 *
 */



package by.company.store.models.products;

import by.company.store.enums.ProductType;
import by.company.store.models.AbstractEntity;
import by.company.store.models.Rating;
import lombok.*;
import org.springframework.data.annotation.Transient;

import java.util.ArrayList;
import java.util.Date;

/**
 * Description basic properties products
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class Product extends AbstractEntity<String> {
    private String name;
    private ProductType type;
    private Date uploadDate;
    private String imageId;
    private ArrayList<Rating> ratings;
    private int amount;
    @Transient private double price;
}
