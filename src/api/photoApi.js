import HTTP from "./index";

const getPhotos = () => HTTP.get(`/photos`);
const getPhotosByProjectId = (projectId) => HTTP.get(`/photos/${projectId}`);
const deletePhoto = (photoId) => HTTP.delete(`/photos/${photoId}`);
const updatePhoto = (multipartFile) => HTTP.put(`/photos`, multipartFile);

export {
    getPhotos,
    getPhotosByProjectId,
    deletePhoto,
    updatePhoto
};