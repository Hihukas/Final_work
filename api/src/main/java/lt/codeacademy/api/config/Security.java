package lt.codeacademy.api.config;

import lt.codeacademy.api.config.security.filter.JwtAuthenticationFilter;
import lt.codeacademy.api.config.security.filter.JwtAuthorizationFilter;
import lt.codeacademy.api.config.security.service.JwtService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
public class Security {
    private final String h2Path;

    public Security(@Value("${spring.h2.console.path}") String h2Path) {
        this.h2Path = h2Path + "/**";
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, AuthenticationConfiguration authenticationConfiguration, JwtService jwtService) throws Exception {
        httpSecurity
                .csrf()
                .disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/projects","/api/projects/*", "/api/photos", "/api/photos/*", "/api/sendEmail")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .and()
                .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager(), jwtService))
                .addFilter(new JwtAuthorizationFilter(authenticationConfiguration.getAuthenticationManager(), jwtService));

        return httpSecurity.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().antMatchers(h2Path);
    }
}
