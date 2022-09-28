package lt.codeacademy.api.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.api.dto.Project;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "PROJECTS")
public class ProjectEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;

    @OneToMany(mappedBy = "projectEntity", cascade = CascadeType.ALL)
    private List<PhotoEntity> photoEntities;

    public ProjectEntity(UUID id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public static ProjectEntity convert(Project project) {
        return new ProjectEntity(project.getId(), project.getTitle(), project.getDescription());
    }
}
