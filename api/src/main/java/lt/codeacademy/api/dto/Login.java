package lt.codeacademy.api.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class Login {
    private final List<String> roles;

    public Login(User user) {
        this.roles = user.getRoles().stream().map(Role::getName).toList();
    }
}
