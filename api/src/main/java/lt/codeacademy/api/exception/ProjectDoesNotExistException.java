package lt.codeacademy.api.exception;

import java.util.UUID;

public class ProjectDoesNotExistException extends RuntimeException {
    private final UUID projectId;

    public ProjectDoesNotExistException(UUID projectId) {
        this.projectId = projectId;
    }

    public UUID getProjectId() {
        return projectId;
    }
}
