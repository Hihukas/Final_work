package lt.codeacademy.api.controller;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lt.codeacademy.api.dto.Project;
import lt.codeacademy.api.exception.ExceptionResponse;
import lt.codeacademy.api.service.PhotoService;
import lt.codeacademy.api.service.ProjectService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

import static lt.codeacademy.api.ApplicationPath.*;

@RestController
@RequestMapping(PROJECTS)
@OpenAPIDefinition(tags = @Tag(name = "Project controller"))
public class ProjectController {
    private final ProjectService projectService;
    private final PhotoService photoService;

    public ProjectController(ProjectService projectService, PhotoService photoService) {
        this.projectService = projectService;
        this.photoService = photoService;
    }

    @Operation(tags = "Project controller", summary = "Create project")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project created successfully.", content = {@Content(schema = @Schema(implementation = Project.class))}),
            @ApiResponse(responseCode = "201", description = "Project created successfully.", content = {@Content(schema = @Schema(implementation = Project.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "403", description = "Can't authorize user.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @PostMapping(value = CREATE_PROJECT, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void createProject(@RequestPart("project") Project project, @RequestPart("multipartFile") MultipartFile[] multipartFiles) {
        photoService.createProject(multipartFiles, project);
    }


    @Operation(tags = "Project controller", summary = "Get all projects")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Projects returned successfully.", content = {@Content(schema = @Schema(implementation = Project.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Project> getProjects() {
        return projectService.getProjects();
    }

    @Operation(tags = "Project controller", summary = "Get project")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project returned successfully.", content = {@Content(schema = @Schema(implementation = Project.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @GetMapping(value = PROJECT, produces = MediaType.APPLICATION_JSON_VALUE)
    public Project getProject(@PathVariable(projectId) UUID id) {
        return projectService.getProject(id);
    }

    @Operation(tags = "Project controller", summary = "Update project")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project updated successfully.", content = {@Content(schema = @Schema(implementation = Project.class))}),
            @ApiResponse(responseCode = "201", description = "Project updated successfully.", content = {@Content(schema = @Schema(implementation = Project.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "403", description = "Can't authorize user.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})

    })
    @PutMapping(value = UPDATE_PROJECT, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateProject(@RequestBody Project project, @PathVariable(projectId) UUID id) {
        project.setId(id);
        projectService.updateProject(project);
    }

    @Operation(tags = "Project controller", summary = "Delete project")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Project deleted successfully.", content = {@Content(schema = @Schema(implementation = Project.class))}),
            @ApiResponse(responseCode = "401", description = "User not authorized.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "403", description = "Can't authorize user.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "404", description = "Request not found.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))}),
            @ApiResponse(responseCode = "500", description = "Internal server error.", content = {@Content(schema = @Schema(implementation = ExceptionResponse.class))})
    })
    @DeleteMapping(value = DELETE_PROJECT)
    public void deleteProject(@PathVariable(projectId) UUID id) {
        projectService.deleteProject(id);
    }
}
