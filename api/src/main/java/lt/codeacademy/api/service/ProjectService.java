package lt.codeacademy.api.service;

import lt.codeacademy.api.dto.Project;
import lt.codeacademy.api.entity.ProjectEntity;
import lt.codeacademy.api.exception.ProjectDoesNotExistException;
import lt.codeacademy.api.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public List<Project> getProjects() {
        return projectRepository.findAll().stream().map(Project::convert).toList();
    }

    public Project getProject(UUID id) {
        return projectRepository.findById(id).map(Project::convert).orElseThrow(() -> new ProjectDoesNotExistException(id));
    }

    public void updateProject(Project project) {
        projectRepository.save(ProjectEntity.convert(project));
    }

    public void deleteProject(UUID id) {
        projectRepository.deleteById(id);
    }
}
