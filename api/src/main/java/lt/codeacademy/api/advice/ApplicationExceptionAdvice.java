package lt.codeacademy.api.advice;

import lt.codeacademy.api.exception.EmailException;
import lt.codeacademy.api.exception.ExceptionResponse;
import lt.codeacademy.api.exception.PhotoException;
import lt.codeacademy.api.exception.ProjectDoesNotExistException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApplicationExceptionAdvice {

    @ExceptionHandler(ProjectDoesNotExistException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionResponse handleProjectDoesNotExistException(ProjectDoesNotExistException projectDoesNotExistException) {
        return new ExceptionResponse(String.format("Can't find project %s", projectDoesNotExistException.getProjectId()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PhotoException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponse handlePhotoException(PhotoException photoException) {
        return new ExceptionResponse(photoException.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(EmailException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponse handleEmailException(EmailException emailException) {
        return new ExceptionResponse(emailException.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ExceptionResponse handleException(Exception exception) {
        return new ExceptionResponse(exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
