/*
 * @(#)CustomErrorType.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.util;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Error message
 *
 * @version 1.0.0 19 Sep 2017
 * @author Kabat Vlad
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomErrorType {

    private String errorMessage;
}

