package lt.codeacademy.api;

public interface ApplicationPath {
    String projectId = "projectId";
    String photoId = "photoId";

    //Projects
    String ROOT = "/api";
    String PROJECTS = ROOT + "/projects";
    String PROJECT = "/{" + projectId + "}";
    String CREATE_PROJECT = "/project/create";
    String UPDATE_PROJECT = "/project/update" + PROJECT;
    String DELETE_PROJECT = "/project/delete" + PROJECT;

    //Photos
    String PHOTOS = ROOT + "/photos";
    String PHOTO_DELETE = "/photo/delete/{" + photoId+ "}";
    String PHOTO_UPDATE = "/photo/update";

    //Email
    String EMAIL = ROOT + "/sendEmail";

    //Login
    String LOGIN = "/login";
}
