/*
 * @(#)SecurityConfig.java 1.8.0_101 2017/10/01
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.store.config.security;

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
 * @version 1.0.0 19 Oct 2017
 * @author Kabat Vlad
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final StoreUserDetailsService storeUserDetailsService;

    @Autowired
    public SecurityConfig(StoreUserDetailsService storeUserDetailsService) {
        this.storeUserDetailsService = storeUserDetailsService;
    }

    //configure
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .anonymous().authorities("ROLE_ANONYMOUS")
                .and()
                .httpBasic().realmName("STORE");
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
