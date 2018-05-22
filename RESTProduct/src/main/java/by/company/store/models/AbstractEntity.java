/*
 * @(#)AbstractEntity.java
 *
 */



package by.company.store.models;

import lombok.Data;
import org.springframework.data.annotation.Id;

/**
 * Abstract entity for all products
 *
 */
@Data
public abstract class AbstractEntity<T> {

    @Id
    private T id;
}
