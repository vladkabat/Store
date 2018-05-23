/*
 * @(#)FrequencyConverter.java
 *
 */



package by.company.store.models.products;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model {@link FrequencyConverter} extends {@link Product} abstract class
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "frequencyConverters")
public class FrequencyConverter extends Product {

    private String manufacturer; //производитель
    private double outputPower; //выходная мощность
    private double outputCurrent; //выходной ток
    private double outputVoltage; //выходное напряжение
}
