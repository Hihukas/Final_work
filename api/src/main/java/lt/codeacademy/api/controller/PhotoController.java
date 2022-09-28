package lt.codeacademy.api.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.api.dto.Photo;
import lt.codeacademy.api.exception.ExceptionResponse;
import lt.codeacademy.api.service.PhotoService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

import static lt.codeacademy.api.ApplicationPath.*;

@RestController
@RequestMapping(PHOTOS)
@OpenAPIDefinition(tags = @Tag(name = "Photo controller"))
public class PhotoController {
    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }

    @Operation(tags = "Photo controller", summary = "Get all photos")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Photos returned successfully.", content = {@Content(schema = @Schema(implementation = Photo.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Photo> getPhotos() {
        return photoService.getPhotos();
    }

    @Operation(tags = "Photo controller", summary = "Get photos by project")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Photos returned successfully.", content = {@Content(schema = @Schema(implementation = Photo.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(value = PROJECT, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Photo> getPhotosByProjectId(@PathVariable(projectId) UUID id) {
        return photoService.getPhotosByProjectId(id);
    }

    @Operation(tags = "Photo controller", summary = "Update photo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Photo updated successfully.", content = {@Content(schema = @Schema(implementation = Photo.class))}),
            @ApiResponse(responseCode = "201", description = "Photo updated successfully.", content = {@Content(schema = @Schema(implementation = Photo.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "403", description = "Can't authorize user.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})

    })
    @PutMapping()
    public void updatePhoto(@RequestPart("photo") Photo photo, @RequestPart("multipartFile") MultipartFile multipartFile) {
        photoService.updatePhoto(multipartFile, photo);
    }

    @Operation(tags = "Photo controller", summary = "Delete photo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Photo deleted successfully.", content = {@Content(schema = @Schema(implementation = Photo.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "403", description = "Can't authorize user.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @DeleteMapping(PHOTO)
    public void deletePhoto(@PathVariable(photoId) UUID id) {
        photoService.deletePhoto(id);
    }
}
