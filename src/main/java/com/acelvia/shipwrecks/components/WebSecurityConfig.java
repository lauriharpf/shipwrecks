package com.acelvia.shipwrecks.components;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Force use of HTTPS in production. See https://devcenter.heroku
 * .com/articles/preparing-a-spring-boot-app-for-production-on-heroku#force-the-use-of-https .
 */
@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    protected void configure(HttpSecurity http) throws Exception {
        http.requiresChannel().requestMatchers(r -> r.getHeader("X-Forwarded-Proto") != null).requiresSecure();
    }
}
