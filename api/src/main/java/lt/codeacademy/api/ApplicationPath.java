package lt.codeacademy.api;

public interface ApplicationPath {
    String projectId = "projectId";
    String photoId = "photoId";

    //Projects

    String PROJECTS = "/projects";
    String PROJECT = "/{" + projectId + "}";
    String CREATE_PROJECT = "/project/create";
    String UPDATE_PROJECT = "/project/update" + PROJECT;
    String DELETE_PROJECT = "/project/delete" + PROJECT;

    //Photos
    String PHOTOS = "/photos";
    String PHOTO_DELETE = "/photo/delete/{" + photoId+ "}";
    String PHOTO_UPDATE = "/photo/update";

    //Email
    String EMAIL = "/sendEmail";

    //Login
    String LOGIN = "/login";

    //Registration
    String REGISTRATION = "/registration";
}
