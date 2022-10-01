package lt.codeacademy.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.api.dto.User;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Setter
@Getter
@NoArgsConstructor
@Entity
@Table(name = "USERS")
public class UserEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<RoleEntity> roles;

    public UserEntity(UUID id, String username, String password, Set<RoleEntity> roles) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public static UserEntity convert(User user) {
        Set<RoleEntity> roles = user.getRoles().stream()
                .map(RoleEntity::convert)
                .collect(Collectors.toSet());

        return new UserEntity(user.getId(), user.getUsername(), user.getPassword(), roles);
    }
}
