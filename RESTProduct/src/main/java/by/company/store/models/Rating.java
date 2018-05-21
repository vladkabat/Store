/*
 * @(#)Rating.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.models;

import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

/**
 * Rating products
 *
 * @version 1.0.0 19 Sep 2017
 * @author Kabat Vlad
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rating {

    @Max(5) @Min(0) private int value;
    private String userId;
}
