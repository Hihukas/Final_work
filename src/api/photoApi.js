import HTTP from "./index";

const getPhotos = () => HTTP.get(`/photos`);
const getPhotosByProjectId = (projectId) => HTTP.get(`/photos/${projectId}`);
const deletePhoto = (photoId) => HTTP.delete(`/photos/photo/delete/${photoId}`);
const updatePhoto = (multipartFile) => HTTP.put(`/photos/photo/update`, multipartFile);

export {
    getPhotos,
    getPhotosByProjectId,
    deletePhoto,
    updatePhoto
};