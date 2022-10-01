package lt.codeacademy.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.api.entity.PhotoEntity;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Photo {
    private UUID id;
    @NotBlank
    private String photoName;
    @NotBlank
    private String mediaType;
    @NotBlank
    private long size;
    @NotBlank
    private byte[] bytes;
    @NotBlank
    private Project project;

    public static Photo convert(PhotoEntity photoEntity) {
        Project project = Project.convert(photoEntity.getProjectEntity());

        return new Photo(photoEntity.getId(), photoEntity.getPhotoName(), photoEntity.getMediaType(), photoEntity.getSize(), photoEntity.getBytes(), project);
    }
}
