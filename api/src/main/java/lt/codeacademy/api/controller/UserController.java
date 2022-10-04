package lt.codeacademy.api.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.api.dto.User;
import lt.codeacademy.api.exception.ExceptionResponse;
import lt.codeacademy.api.service.UserService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static lt.codeacademy.api.ApplicationPath.*;

@RestController
@RequestMapping(REGISTRATION)
@OpenAPIDefinition(tags = @Tag(name = "User controller"))
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Operation(tags = "User controller", summary = "Create user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User created successfully.", content = {@Content(schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "201", description = "User created successfully.", content = {@Content(schema = @Schema(implementation = User.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }
}
