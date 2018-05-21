/*
 * @(#)Engine.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.models.products;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model 'Engine' extends {@link Product} abstract class
 *
 * @version 1.0.0 19 Sep 2017
 * @author Kabat Vlad
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "phones")
public class Engine extends Product {

    private String manufacturer; //производитель
    private double ratedPower; //номинальная мощность
    private double ratedCurrent; //номинальный ток
}
