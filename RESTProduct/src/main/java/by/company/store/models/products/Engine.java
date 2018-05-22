/*
 * @(#)Engine.java
 *
 */



package by.company.store.models.products;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model {@link Engine} extends {@link Product} abstract class
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "engines")
public class Engine extends Product {

    private String manufacturer; //производитель
    private double ratedPower; //номинальная мощность
    private double ratedCurrent; //номинальный ток
    private double ratedVoltage; //номинальное напряжение
}
