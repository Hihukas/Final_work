package lt.codeacademy.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.api.entity.ProjectEntity;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class Project {
    private UUID id;
    private String title;
    private String description;
    private List<Photo> photos;

    public Project(UUID id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }

    public static Project convert(ProjectEntity projectEntity) {
        return new Project(projectEntity.getId(), projectEntity.getTitle(), projectEntity.getDescription());
    }
}
