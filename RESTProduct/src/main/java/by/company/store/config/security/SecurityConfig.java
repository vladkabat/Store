/*
 * @(#)SecurityConfig.java
 *
 */



package by.company.store.config.security;

import by.company.store.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Configuration Spring Security
 * extends {@link WebSecurityConfigurerAdapter} abstract class
 *
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final StoreUserDetailsService storeUserDetailsService;
    private static final String REALM_NAME = "STORE";

    @Autowired
    public SecurityConfig(StoreUserDetailsService storeUserDetailsService) {
        this.storeUserDetailsService = storeUserDetailsService;
    }

    //configure
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .anonymous().authorities(Role.ROLE_ANONYMOUS.toString())
                .and()
                .httpBasic().realmName(REALM_NAME);
    }

    //password encoder
    @Bean
    public PasswordEncoder bcryptPasswordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //Add user in SpringContext if user exist in db
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.
                userDetailsService(storeUserDetailsService).
                passwordEncoder(bcryptPasswordEncoder());
    }
}
