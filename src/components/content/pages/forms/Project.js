import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {Button, CircularProgress, Stack, Box, Typography, Alert, Paper} from "@mui/material";
import {createProject} from "../../../../api/projectApi";
import {useState} from "react";
import {PhotoCamera} from "@mui/icons-material";
import Input from "./Input";


const projectValidationSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Title should be not less than 3 symbols.')
        .max(50, 'Title should be not more than 50 symbols.')
        .required('Title is required.'),
    description: Yup.string()
        .required('Description is required.')
})

export default () => {
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
                    message: 'Project created successfully!',
                    severity: 'success'
                });

                const newArray = [];
                setSelectedPhoto(newArray);

            })
            .catch(() => setNotification({
                isVisible: true,
                message: 'Project could not be created! If this problem repeats, contact local administrator.',
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
                                    Add new project</Typography>

                                <Input name="title"
                                       label="Title"
                                       placeholder="Title"
                                       error={props.touched.title && !!props.errors.title}/>

                                <Input name="description"
                                       label="Description"
                                       placeholder="Description"
                                       error={props.touched.description && !!props.errors.description}
                                       multiline/>

                                <Box>

                                    {isPhotoPicked ?

                                        <Box>
                                            <Typography>Selected photos:</Typography>

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

                                        <PhotoCamera sx={{mr: 2}}/> Upload

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
                                                Submit</Button>
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

export {projectValidationSchema}
