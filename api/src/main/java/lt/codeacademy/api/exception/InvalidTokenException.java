package lt.codeacademy.api.exception;

import org.springframework.context.annotation.Profile;

@Profile("h2")
public class InvalidTokenException extends RuntimeException {
}
