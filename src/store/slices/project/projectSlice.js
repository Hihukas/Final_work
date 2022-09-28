import {createSlice} from "@reduxjs/toolkit";
import {addToStorage, getFromStorage} from "../../../localStorage/localStorage";


const projectSlice = createSlice(
    {
        name: 'project',
        initialState: [],
        reducers: {
            getProject(state, {payload: project}) {
                const existingProject = state.find(p => p.id === project.id);
                if (existingProject) {
                    return this.state;
                } else if(state.length === 0) {
                    state.push(project);
                }
            },
            removeProject(state, {payload: id}) {

            },
            addProjectPhoto(state, action) {

            },
            removeProjectPhoto(state, action) {

            },
            updateProjectTitle(state, action) {

            },
            updateProjectDescription(state, action) {

            }
        }
    }
);

let projectState = [];
const addProjectToStorage = (store) => {
    store.subscribe(() => {
        const project = store.getState().project;
        if (projectState !== project) {
            addToStorage('project', project);
            projectState = project;
        }
    });
};

const loadProjectFromStorage = () => getFromStorage('project') || [];


export default projectSlice.reducer;
export const {
    getProject,
    removeProject,
    addProjectPhoto,
    removeProjectPhoto,
    updateProjectTitle,
    updateProjectDescription
} = projectSlice.actions;
export {
    addProjectToStorage,
    loadProjectFromStorage
}