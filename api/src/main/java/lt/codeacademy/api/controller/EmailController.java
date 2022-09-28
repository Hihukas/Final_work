package lt.codeacademy.api.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.api.dto.Email;
import lt.codeacademy.api.exception.ExceptionResponse;
import lt.codeacademy.api.service.EmailService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lt.codeacademy.api.ApplicationPath.EMAIL;

@RestController
@RequestMapping(EMAIL)
@OpenAPIDefinition(tags = @Tag(name = "Email controller"))
public class EmailController {
    private final EmailService emailService;

    public EmailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @Operation(tags = "Email controller", summary = "Send email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email sent successfully.", content = {@Content(schema = @Schema(implementation = Email.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping
    public String sendEmail(@RequestBody Email email) {
        return emailService.sendSimpleEmail(email);
    }
}
