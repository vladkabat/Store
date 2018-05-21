/*
 * @(#)FrequencyConverter.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.models.products;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model 'FrequencyConverter' extends {@link Product} abstract class
 *
 * @version 1.0.0 19 Sep 2017
 * @author Kabat Vlad
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tablets")
public class FrequencyConverter extends Product {

    private double ram;
    private double numberCores;
    private double screenSize;
}
