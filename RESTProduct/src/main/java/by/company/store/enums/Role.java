/*
 * @(#)Role.java
 *
 */


package by.company.store.enums;

import org.springframework.security.core.GrantedAuthority;

/**
 * All roles user
 *
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
