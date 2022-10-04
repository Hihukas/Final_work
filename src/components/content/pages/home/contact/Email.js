import {Form, Formik} from "formik";
import * as Yup from 'yup';
import {Button, CircularProgress, Stack, Box, Typography, Alert, Paper} from "@mui/material";
import {useState} from "react";
import Input from "../../forms/Input";
import {sendEmail} from "../../../../../api/emailApi";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

export default () => {
    const {t} = useTranslation('email');
    const user = useSelector(state => state.user.user);

    const emailValidationSchema = Yup.object().shape({
        email: Yup.string()
            .email(`${t('invalidEmail')}`)
            .required(`${t('emailRequired')}`),
        topic: Yup.string()
            .min(5, `${t('topicMin')}`)
            .max(50, `${t('topicMax')}`)
            .required(`${t('topicRequired')}`),
        message: Yup.string()
            .max(250, `${t('messageMax')}`)
            .required(`${t('messageRequired')}`)
    });

    const [notification, setNotification] = useState({isVisible: false});

    const onSendEmail = (formikValues, formikHelpers) => {
        formikHelpers.setSubmitting(true);

        sendEmail(formikValues)
            .then(() => {
                formikHelpers.resetForm();

                setNotification({
                    isVisible: true,
                    message: `${t('notificationSuccess')}`,
                    severity: 'success'
                });
            })
            .catch(() => setNotification({
                isVisible: true,
                message: `${t('notificationError')}`,
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
                                    {t('emailUs')}</Typography>

                                <Input name="email"
                                       label={t('yourEmail')}
                                       placeholder={t('yourEmail')}
                                       error={props.touched.email && !!props.errors.email}/>

                                <Input name="topic"
                                       label={t('topic')}
                                       placeholder={t('topic')}
                                       error={props.touched.topic && !!props.errors.topic}/>

                                <Input name="message"
                                       label={t('message')}
                                       placeholder={t('message')}
                                       error={props.touched.message && !!props.errors.message}
                                       multiline/>

                                {
                                    notification.isVisible &&
                                    <Alert severity={notification.severity}>{notification.message}</Alert>
                                }

                            </Stack>

                            {user?.roles.includes('USER') ?
                                <Box sx={{mt: 2, textAlign: 'center'}}>
                                    {
                                        props.isSubmitting ? <CircularProgress size={30}/> :
                                            <Button size="medium"
                                                    variant="contained"
                                                    type="submit"
                                                    color="primary">
                                                {t('send')}</Button>
                                    }
                                </Box> : <Alert severity="error" sx={{mt: 2}}>{t('toSend')}</Alert>
                            }
                        </Paper>

                    </Form>

                )}

            </Formik>

        </Box>

    );
}