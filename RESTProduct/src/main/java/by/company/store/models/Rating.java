/*
 * @(#)Rating.java
 */



package by.company.store.models;

import lombok.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

/**
 * Rating products
 *
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Rating {

    @Max(5) @Min(0) private int value;
    private String userId;
}
