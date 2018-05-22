/*
 * @(#)CustomErrorType.java
 *
 */



package by.company.store.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Error message
 *
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomErrorType {

    private String errorMessage;
}

