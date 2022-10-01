package lt.codeacademy.api.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.codeacademy.api.dto.Photo;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PHOTOS")
public class PhotoEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "VARCHAR(36)", updatable = false)
    @Type(type = "uuid-char")
    private UUID id;
    @Column(nullable = false)
    private String photoName;
    @Column(nullable = false)
    private String mediaType;
    @Column(nullable = false)
    private long size;
    @Lob
    private byte[] bytes;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "project_id")
    private ProjectEntity projectEntity;

    public static PhotoEntity convert(Photo photo) {
        ProjectEntity projectEntity = ProjectEntity.convert(photo.getProject());

        return new PhotoEntity(photo.getId(), photo.getPhotoName(), photo.getMediaType(), photo.getSize(), photo.getBytes(), projectEntity);
    }
}
