package lt.codeacademy.api;

public interface ApplicationPath {
    String projectId = "projectId";
    String photoId = "photoId";

    String ROOT = "/api";
    String PROJECTS = ROOT + "/projects";
    String PROJECT = "/{" + projectId + "}";
    String PHOTOS = ROOT + "/photos";
    String PHOTO = "/{" + photoId+ "}";
    String EMAIL = ROOT + "/sendEmail";
}
