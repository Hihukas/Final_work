import {useEffect, useState} from "react";
import {Alert, CircularProgress, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {getPhotos} from "../../../../../api/photoApi";
import {getProjects} from "../../../../../api/projectApi";
import {autoPlay} from "react-swipeable-views-utils";
import Views from "react-swipeable-views";
import {useTheme} from "@mui/material/styles";
import * as React from "react";
import {useTranslation} from "react-i18next";

const AutoPlayViews = autoPlay(Views);

export default () => {
    const [getProjectsNotification, setGetProjectsNotification] = useState({isVisible: false});
    const [emptyProjectsNotification, setEmptyProjectsNotification] = useState({isVisible: false});
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState([]);
    const [photos, setPhotos] = useState([]);
    const theme = useTheme();
    const [activePhoto, setActivePhoto] = useState(0);
    const {t} = useTranslation('projects');

    const handleStepChange = (photo) => {
        setActivePhoto(photo);
    };

    useEffect(() => {
        axios.all([getProjects(), getPhotos()])
            .then(axios.spread((...responses) => {
                const projectsData = responses[0].data;
                const photosData = responses[1].data;

                setProjects(projectsData);
                setPhotos(photosData);

                if (projectsData.length === 0) {
                    setEmptyProjectsNotification({
                        isVisible: true,
                        message: `${t('emptyProjectsError')}`,
                        severity: 'error'
                    });
                } else {
                    setEmptyProjectsNotification({isVisible: false});
                }

            }))
            .catch(() => setGetProjectsNotification({
                isVisible: true,
                message: `${t('getProjectsError')}`,
                severity: 'error'
            }))
            .finally(() => setLoading(false));
    }, []);

    return (

        <Box sx={{
            minHeight: '500px',
            width: '100%',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            <Box>

                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

                    <Typography variant='h6' sx={{
                        width: '175px',
                        display: 'flex',
                        justifyContent: 'center',
                        borderBottom: '2px solid #1565c0'
                    }}>{t('ourProjects')}</Typography>

                </Box>

                {loading ? <CircularProgress size={100}/> :

                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', m: 2}}>

                        {
                            getProjectsNotification.isVisible &&
                            <Alert severity={getProjectsNotification.severity}>{getProjectsNotification.message}</Alert>
                        }

                        {
                            emptyProjectsNotification.isVisible &&
                            <Alert
                                severity={emptyProjectsNotification.severity}>{emptyProjectsNotification.message}</Alert>
                        }

                        {projects.map((project) => (

                            <Box sx={{
                                width: '400px',
                                flexGrow: 1,
                                ml: 2,
                                mr: 2,
                                textDecoration: 'none',
                                ":hover": {backgroundColor: '#fff', opacity: '0.75'}
                            }} to={`/project/${project.id}`}
                                 component={NavLink}
                                 key={project.id}>

                                <AutoPlayViews
                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                    index={activePhoto}
                                    onChangeIndex={handleStepChange}
                                >

                                    {photos.filter((photo) => (project.id === photo.project.id)).map((photo, index) => (

                                        <Box key={photo.id}>

                                            {Math.abs(activePhoto - index) <= 2 ? (

                                                <Box
                                                    component="img"
                                                    sx={{
                                                        height: 255,
                                                        display: 'block',
                                                        maxWidth: 400,
                                                        overflow: 'hidden',
                                                        width: '100%',
                                                    }}
                                                    src={"data:image/jpeg;base64, " + photo.bytes}
                                                />

                                            ) : null}

                                        </Box>

                                    ))}

                                </AutoPlayViews>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#1565c0'
                                    }}
                                >
                                    <Typography
                                        sx={{fontSize: "24px", color: "white"}}>{project.title}</Typography>

                                </Box>

                            </Box>

                        ))}

                    </Box>
                }

            </Box>

        </Box>

    );
};