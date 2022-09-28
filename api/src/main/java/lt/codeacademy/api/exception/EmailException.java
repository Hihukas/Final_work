package lt.codeacademy.api.exception;

public class EmailException extends RuntimeException {
    public EmailException(String message) {
        super(message);
    }
}
