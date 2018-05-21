/*
 * @(#)Role.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */


package by.company.store.enums;

import org.springframework.security.core.GrantedAuthority;

/**
 * All roles user
 *
 * @author Kabat Vlad
 * @version 1.0.0 19 Sep 2017
 */
public enum Role implements GrantedAuthority {
    ROLE_CUSTOMER,
    ROLE_ADMIN,
    ROLE_ANONYMOUS;

    @Override
    public String getAuthority() {
        return name();
    }
}
