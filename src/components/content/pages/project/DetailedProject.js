import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteProject, getProject, updateProject} from "../../../../api/projectApi";
import {Alert, Button, CircularProgress, ImageList, ImageListItem, Paper, Typography} from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import axios from "axios";
import {deletePhoto, getPhotosByProjectId, updatePhoto} from "../../../../api/photoApi";
import {Form, Formik} from "formik";
import {projectValidationSchema} from "../forms/Project";
import Input from "../forms/Input";

export default () => {
    const {projectId} = useParams();
    const [loading, setLoading] = useState(true);
    const [loadingNotification, setLoadingNotification] = useState({isVisible: false});
    const [deleteNotification, setDeleteNotification] = useState({isVisible: false});
    const [updatePhotoNotification, setUpdatePhotoNotification] = useState({isVisible: false});
    const [updateProjectNotification, setUpdateProjectNotification] = useState({isVisible: false});
    const [project, setProject] = useState({});
    const [photos, setPhotos] = useState([]);
    const [updateProjectText, setUpdateProjectText] = useState({isVisible: false});


    const startUpdateProjectText = () => {
        setUpdateProjectText({isVisible: true});
    }

    const onUpdateProjectText = (formikValues, formikHelpers) => {
        formikHelpers.setSubmitting(true);

        updateProject(projectId, formikValues)
            .then(() => {
                formikHelpers.resetForm();
                setProject(formikValues);
            })
            .catch(() => setUpdateProjectNotification({
                isVisible: true,
                message: 'Project could not be updated! If this problem repeats, contact local administrator.',
                severity: 'error'
            }))
            .finally(() => {
                formikHelpers.setSubmitting(false);
                setUpdateProjectText({isVisible: false});
            });

    }

    const removePhoto = (id) => {
        deletePhoto(id)
            .then(() => setPhotos((current) => current.filter((photo) => photo.id !== id)))
            .catch(() => setDeleteNotification({
                isVisible: true,
                message: 'Photo could not be deleted! If this problem repeats, contact local administrator.',
                severity: 'error'
            }))
    }

    const getBase64 = (photo) => {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(photo);

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.onerror =(error) => reject(error);
        });
    };

    const changePhoto = (photo, bytes, selectedPhoto) => {
        const newArray = [...photos];
        const oldPhoto = newArray.find(p => (p.id === photo.id));
        oldPhoto.photoName = selectedPhoto.name;
        oldPhoto.mediaType = selectedPhoto.mediaType;
        oldPhoto.size = selectedPhoto.size;
        oldPhoto.bytes = bytes;

        setPhotos(newArray);
    }

    const onUpdatePhoto = async (event, index, photo) => {
        const selectedPhoto = event.target.files[0];
        const base64 = await getBase64(selectedPhoto);
        const bytes = (base64) => base64.replace('data:', '').replace(/^.+,/, '');

        const data = new FormData();
        data.append('multipartFile', selectedPhoto);
        data.append('photo', new Blob([JSON.stringify({
            'id': photo.id,
            'photoName': photo.photoName,
            'mediaType': photo.mediaType,
            'size': photo.size,
            'bytes': photo.bytes,
            'project': photo.project
        })], {type: 'application/json'}));



        updatePhoto(data)
            .then(() => {
                changePhoto(photo, bytes(base64), selectedPhoto);
            })
            .catch(() => setUpdatePhotoNotification({
                isVisible: true,
                message: 'Photo could not be updated! If this problem repeats, contact local administrator.',
                severity: 'error'
            }))
    }

    useEffect(() => {
        axios.all([getProject(projectId), getPhotosByProjectId(projectId)])
            .then(axios.spread((...responses) => {
                const projectData = responses[0].data;
                const photosData = responses[1].data;

                setProject(projectData);
                setPhotos(photosData)
            }))
            .catch(() => setLoadingNotification({
                isVisible: true,
                message: 'Project could not be displayed! If this problem repeats, contact local administrator.',
                severity: 'error'
            }))
            .finally(() => setLoading(false));
    }, []);

    return (

        <Box sx={{
            height: 'calc(100vh - 50px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}>

            {
                loading ? <CircularProgress size={100}/> :

                    <Paper elevation={3}>

                        <Box sx={{
                            width: '750px',
                            flexGrow: 1,
                            textDecoration: 'none',
                            m: 2
                        }}>

                            <ImageList cols={3}>
                                {photos.map((photo, index) => (

                                    <ImageListItem key={photo.id}>

                                        <img
                                            src={"data:image/jpeg;base64, " + photo.bytes}
                                            alt={""}
                                            loading="lazy"
                                        />

                                        <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>

                                            <Button component="label"
                                                    sx={{maxHeight: '24px', minWidth: '24px', width: '24px'}}>

                                                <UpdateIcon sx={{color: '#43a047'}}/>

                                                <input hidden accept="image/*" type="file" name="multipartFile"
                                                       id="multipartFile"
                                                       onChange={(event) => onUpdatePhoto(event, index, photo)}
                                                />

                                            </Button>

                                            <Button sx={{maxHeight: '24px', minWidth: '24px', width: '24px'}}>

                                                <DeleteIcon sx={{color: '#ba000d'}}
                                                            onClick={() => removePhoto(photo.id)}/>

                                            </Button>

                                        </Box>


                                    </ImageListItem>


                                ))}
                            </ImageList>

                            {
                                deleteNotification.isVisible &&
                                <Alert severity={deleteNotification.severity}>{deleteNotification.message}</Alert>
                            }

                            {
                                updatePhotoNotification.isVisible &&
                                <Alert
                                    severity={updatePhotoNotification.severity}>{updatePhotoNotification.message}</Alert>
                            }

                            {
                                loadingNotification.isVisible &&
                                <Alert severity={loadingNotification.severity}>{loadingNotification.message}</Alert>
                            }

                            <Formik initialValues={{title: '', description: ''}}
                                    onSubmit={onUpdateProjectText}
                                    validationSchema={projectValidationSchema}>

                                {props => (

                                    <Form>

                                        <Paper elevation={3}
                                               sx={{
                                                   display: 'flex',
                                                   justifyContent: 'center',
                                                   alignItems: 'center',
                                                   backgroundColor: '#1565c0'
                                               }}
                                        >

                                            <Typography
                                                sx={{fontSize: "24px", color: "white"}}>{project.title}</Typography>

                                        </Paper>

                                        {updateProjectText.isVisible &&

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mt: 2
                                            }}>

                                                <Input name="title"
                                                       label="Title"
                                                       placeholder="Title"
                                                       error={props.touched.title && !!props.errors.title}
                                                       sx={{width: '750px'}}/>

                                            </Box>

                                        }

                                        <Paper elevation={3} sx={{mt: 2}}>

                                            <Typography
                                                sx={{
                                                    fontSize: "18px",
                                                    color: "black"
                                                }}>{project.description}</Typography>

                                        </Paper>

                                        {updateProjectText.isVisible &&

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mt: 2
                                            }}>

                                                <Input name="description"
                                                       label="Description"
                                                       placeholder="Description"
                                                       error={props.touched.description && !!props.errors.description}
                                                       multiline
                                                       sx={{width: '750px'}}/>

                                            </Box>

                                        }

                                        {updateProjectText.isVisible &&

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                mt: 2
                                            }}>

                                                <Button size="medium"
                                                        variant="contained"
                                                        type="submit"
                                                        color="primary"
                                                >
                                                    Submit</Button>

                                            </Box>

                                        }

                                        {
                                            updateProjectNotification.isVisible &&
                                            <Alert sx={{mt: 2}}
                                                   severity={updateProjectNotification.severity}>{updateProjectNotification.message}</Alert>
                                        }

                                    </Form>

                                )}

                            </Formik>

                            <Box sx={{display: 'flex', justifyContent: 'end', mt: 2}}>

                                <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}}>

                                    <Button onClick={startUpdateProjectText}
                                            sx={{maxHeight: '24px', minWidth: '24px', width: '24px'}}>

                                        <UpdateIcon sx={{color: '#43a047'}}/>

                                    </Button>

                                </Box>

                                <Box sx={{width: '24px', height: '24px'}} to={"/"} component={NavLink}>

                                    <DeleteIcon sx={{color: '#ba000d'}}
                                                onClick={() => deleteProject(project.id)}/>

                                </Box>

                            </Box>

                        </Box>

                    </Paper>
            }

        </Box>

    );
}