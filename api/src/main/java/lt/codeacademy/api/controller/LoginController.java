package lt.codeacademy.api.controller;

import lt.codeacademy.api.dto.Login;
import lt.codeacademy.api.dto.User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static lt.codeacademy.api.ApplicationPath.LOGIN;

@RestController
@RequestMapping(LOGIN)
public class LoginController {
    @PostMapping
    public Login login(@AuthenticationPrincipal User user) {
        return new Login(user);
    }
}
