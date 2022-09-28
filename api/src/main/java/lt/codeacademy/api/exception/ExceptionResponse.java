package lt.codeacademy.api.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter
public class ExceptionResponse {
    private final String message;
    private final int status;
    private final long timestamp;

    public ExceptionResponse(String message, HttpStatus httpStatus) {
        this.message = message;
        this.status = httpStatus.value();
        timestamp = LocalDateTime.now().atZone(ZoneId.systemDefault()).toEpochSecond();
    }
}
