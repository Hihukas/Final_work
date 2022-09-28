import HTTP from "./index";

const getProjects = () => HTTP.get('/projects');
const createProject = (multipartFile) => HTTP.post('/projects', multipartFile);
const getProject = (projectId) => HTTP.get(`/projects/${projectId}`);
const updateProject = (projectId, project) => HTTP.put(`/projects/${projectId}`, project);
const deleteProject = (projectId) => HTTP.delete(`/projects/${projectId}`);

export {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject
};