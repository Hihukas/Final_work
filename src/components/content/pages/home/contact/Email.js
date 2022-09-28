import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {Button, CircularProgress, Stack, Box, Typography, Alert, Paper} from "@mui/material";
import {useState} from "react";
import Input from "../../forms/Input";
import {sendEmail} from "../../../../../api/emailApi";

const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email is not valid.')
        .required('Email is required'),
    topic: Yup.string()
        .min(5, 'Topic should be not less than 5 symbols.')
        .max(50, 'Topic should be not more than 50 symbols.')
        .required('Topic is required.'),
    message: Yup.string()
        .max(250, 'Message should be not more than 250 symbols.')
        .required('Message is required.')
})

export default () => {
    const [notification, setNotification] = useState({isVisible: false});

    const onSendEmail = (formikValues, formikHelpers) => {
        formikHelpers.setSubmitting(true);

        sendEmail(formikValues)
            .then(() => {
                formikHelpers.resetForm();

                setNotification({
                    isVisible: true,
                    message: 'Your email sent successfully!',
                    severity: 'success'
                });
            })
            .catch(() => setNotification({
                isVisible: true,
                message: 'We could not your send email! If this problem repeats, contact local administrator.',
                severity: 'error'
            }))
            .finally(() => formikHelpers.setSubmitting(false));
    }

    return (

        <Box sx={{display: 'flex', alignItems: 'center'}}>

            <Formik initialValues={{email: '', topic: '', message: ''}}
                    onSubmit={onSendEmail}
                    validationSchema={emailValidationSchema}
            >

                {props => (

                    <Form>

                        <Paper elevation={3} sx={{p: 2, width: '500px', mr: 2}}>

                            <Stack spacing={2} sx={{width: '500px'}}>

                                <Typography variant="h6"
                                            sx={{textAlign: 'left'}}>
                                    Email us</Typography>

                                <Input name="email"
                                       label="Your email"
                                       placeholder="Your email"
                                       error={props.touched.email && !!props.errors.email}/>

                                <Input name="topic"
                                       label="Topic"
                                       placeholder="Topic"
                                       error={props.touched.topic && !!props.errors.topic}/>

                                <Input name="message"
                                       label="Message"
                                       placeholder="Message"
                                       error={props.touched.message && !!props.errors.message}
                                       multiline/>

                                {
                                    notification.isVisible &&
                                    <Alert severity={notification.severity}>{notification.message}</Alert>
                                }

                            </Stack>

                            <Box sx={{mt: 2, textAlign: 'center'}}>
                                {
                                    props.isSubmitting ? <CircularProgress size={30}/> :
                                        <Button size="medium"
                                                variant="contained"
                                                type="submit"
                                                color="primary">
                                            Send</Button>
                                }
                            </Box>

                        </Paper>

                    </Form>

                )}

            </Formik>

        </Box>

    );
}