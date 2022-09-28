package lt.codeacademy.api.service;

import lt.codeacademy.api.dto.Photo;
import lt.codeacademy.api.dto.Project;
import lt.codeacademy.api.entity.PhotoEntity;
import lt.codeacademy.api.entity.ProjectEntity;
import lt.codeacademy.api.exception.PhotoException;
import lt.codeacademy.api.repository.PhotoRepository;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final Set<String> CONTENT_TYPES = Set.of(MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_GIF_VALUE);

    public PhotoService(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    public void createProject(MultipartFile[] multipartFiles, Project project) {
        ProjectEntity projectEntity = ProjectEntity.convert(project);

        for (MultipartFile multipartFile : multipartFiles) {
            photoValidation(multipartFile);

            try {
                PhotoEntity photoEntity = new PhotoEntity(null, multipartFile.getOriginalFilename(), multipartFile.getContentType(), multipartFile.getSize(), multipartFile.getBytes(), projectEntity);

                photoRepository.save(photoEntity);

            } catch (IOException e) {
                throw new PhotoException(String.format("Can't save photo %s in DB.", multipartFile.getOriginalFilename()));
            }
        }
    }

    public List<Photo> getPhotos() {
        return photoRepository.findAll().stream().map(Photo::convert).toList();
    }

    public List<Photo> getPhotosByProjectId(UUID id) {
        return photoRepository.findAllByProjectEntityId(id).stream().map(Photo::convert).toList();
    }

    public void updatePhoto(MultipartFile multipartFile, Photo photo) {
        Photo updatePhoto = new Photo();

        try {
            updatePhoto.setId(photo.getId());
            updatePhoto.setPhotoName(multipartFile.getOriginalFilename());
            updatePhoto.setMediaType(multipartFile.getContentType());
            updatePhoto.setSize(multipartFile.getSize());
            updatePhoto.setBytes(multipartFile.getBytes());
            updatePhoto.setProject(photo.getProject());

            photoRepository.save(PhotoEntity.convert(updatePhoto));
        } catch (IOException e) {
            throw new PhotoException(String.format("Can't save photo %s in DB.", multipartFile.getOriginalFilename()));
        }
    }

    public void deletePhoto(UUID id) {
        photoRepository.deleteById(id);
    }


    private void photoValidation(MultipartFile multipartFile) {
        long MAX_FILE_SIZE = 10000000;

        if (multipartFile.getSize() > MAX_FILE_SIZE) {
            throw new PhotoException(String.format("Photo size %s is to big. Size should be not more than %s bytes.", multipartFile.getSize(), MAX_FILE_SIZE));
        }

        if (!CONTENT_TYPES.contains(multipartFile.getContentType())) {
            throw new PhotoException(String.format("Photo type %s is unknown.", multipartFile.getContentType()));
        }
    }
}
