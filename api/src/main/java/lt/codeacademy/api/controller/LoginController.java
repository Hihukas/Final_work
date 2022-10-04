package lt.codeacademy.api.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.api.dto.Email;
import lt.codeacademy.api.dto.Login;
import lt.codeacademy.api.dto.User;
import lt.codeacademy.api.exception.ExceptionResponse;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lt.codeacademy.api.ApplicationPath.LOGIN;

@RestController
@RequestMapping(LOGIN)
@OpenAPIDefinition(tags = @Tag(name = "Login controller"))
public class LoginController {
    @Operation(tags = "Login controller", summary = "Login")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "You have logged in successfully!.", content = {@Content(schema = @Schema(implementation = Login.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping
    public Login login(@AuthenticationPrincipal User user) {
        return new Login(user);
    }
}
