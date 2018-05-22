/*
 * @(#)Manufacturer.java
 *
 */



package by.company.store.models;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Model {@link Manufacturer}
 *
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "manufacturers")
public class Manufacturer  extends AbstractEntity<String> {
    private String name;
    private String phone;
    private String email;
    private String description;
}
