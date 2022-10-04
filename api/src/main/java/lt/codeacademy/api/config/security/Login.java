package lt.codeacademy.api.config.security;

import org.springframework.context.annotation.Profile;

@Profile("h2")
public record Login(String username, String password) {
}
