package lt.codeacademy.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.api.entity.PhotoEntity;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Photo {
    private UUID id;
    private String photoName;
    private String mediaType;
    private long size;
    private byte[] bytes;
    private Project project;

    public static Photo convert(PhotoEntity photoEntity) {
        Project project = Project.convert(photoEntity.getProjectEntity());

        return new Photo(photoEntity.getId(), photoEntity.getPhotoName(), photoEntity.getMediaType(), photoEntity.getSize(), photoEntity.getBytes(), project);
    }
}
