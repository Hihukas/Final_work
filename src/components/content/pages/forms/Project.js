import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {Button, CircularProgress, Stack, Box, Typography, Alert, Paper} from "@mui/material";
import {createProject} from "../../../../api/projectApi";
import {useState} from "react";
import {PhotoCamera} from "@mui/icons-material";
import Input from "./Input";
import {useTranslation} from "react-i18next";

export default () => {
    const {t} = useTranslation('project');

    const projectValidationSchema = Yup.object().shape({
        title: Yup.string()
            .min(3, `${t('titleMin')}`)
            .max(50, `${t('titleMax')}`)
            .required(`${t('titleRequired')}`),
        description: Yup.string()
            .required(`${t('descriptionRequired')}`)
    });

    const [notification, setNotification] = useState({isVisible: false});
    const [selectedPhoto, setSelectedPhoto] = useState([]);
    const [isPhotoPicked, setIsPhotoPicked] = useState(false);

    const onHandleChange = (event) => {
        const photos = [];
        for (let i = 0; i < event.target.files.length; i++) {
            photos.push(event.target.files[i]);
        }

        setSelectedPhoto([...selectedPhoto, ...photos]);
        setIsPhotoPicked(true);
    }

    const onCreateProject = (formikValues, formikHelpers) => {
        formikHelpers.setSubmitting(true);

        const data = new FormData();
        selectedPhoto.map((selectedPhoto) => {
            data.append('multipartFile', selectedPhoto);
        });
        data.append('project', new Blob([JSON.stringify({
            'title': formikValues.title,
            'description': formikValues.description
        })], {type: 'application/json'}));

        createProject(data)
            .then(() => {
                setIsPhotoPicked(false);
                formikHelpers.resetForm();
                setNotification({
                    isVisible: true,
                    message: `${t('notificationSuccess')}`,
                    severity: 'success'
                });

                const newArray = [];
                setSelectedPhoto(newArray);

            })
            .catch(() => setNotification({
                isVisible: true,
                message: `${t('notificationError')}`,
                severity: 'error'
            }))
            .finally(() => formikHelpers.setSubmitting(false));
    }

    return (
        <Box sx={{
            height: 'calc(100vh - 50px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}>

            <Formik initialValues={{title: '', description: '', multipartFile: ''}}
                    onSubmit={onCreateProject}
                    validationSchema={projectValidationSchema}
            >

                {props => (

                    <Form>

                        <Paper elevation={3} sx={{p: 2}}>

                            <Stack spacing={2} sx={{width: '500px'}}>

                                <Typography variant="h6"
                                            sx={{textAlign: 'left'}}>
                                    {t('addNewProject')}</Typography>

                                <Input name="title"
                                       label={t('title')}
                                       placeholder={t('title')}
                                       error={props.touched.title && !!props.errors.title}/>

                                <Input name="description"
                                       label={t('description')}
                                       placeholder={t('description')}
                                       error={props.touched.description && !!props.errors.description}
                                       multiline/>

                                <Box>

                                    {isPhotoPicked ?

                                        <Box>
                                            <Typography>{t('selectedPhotos')}</Typography>

                                            {
                                                selectedPhoto.map((photo, index) => {
                                                    return (

                                                        <Typography key={index}>{photo.name}</Typography>

                                                    );
                                                })
                                            }

                                        </Box> :

                                        <></>
                                    }

                                    <Button variant="contained" component="label">

                                        <PhotoCamera sx={{mr: 2}}/> {t('upload')}

                                        <input hidden accept="image/*" multiple type="file" name="multipartFile"
                                               id="multipartFile"
                                               onChange={onHandleChange}
                                        />

                                    </Button>

                                </Box>

                                {
                                    notification.isVisible &&
                                    <Alert severity={notification.severity}>{notification.message}</Alert>
                                }

                            </Stack>

                            {isPhotoPicked ?

                                <Box sx={{mt: 2, textAlign: 'end'}}>

                                    {
                                        props.isSubmitting ? <CircularProgress size={30}/> :
                                            <Button size="medium"
                                                    variant="contained"
                                                    type="submit"
                                                    color="primary"
                                            >
                                                {t('add')}</Button>
                                    }

                                </Box> :

                                <></>

                            }
                        </Paper>

                    </Form>

                )}

            </Formik>

        </Box>
    );
}
