import HTTP from "./index";

const getProjects = () => HTTP.get('/projects');
const createProject = (multipartFile) => HTTP.post('/projects/project/create', multipartFile);
const getProject = (projectId) => HTTP.get(`/projects/${projectId}`);
const updateProject = (projectId, project) => HTTP.put(`/projects/project/update/${projectId}`, project);
const deleteProject = (projectId) => HTTP.delete(`/projects/project/delete/${projectId}`);

export {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject
};