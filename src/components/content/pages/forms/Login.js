import {Form, Formik} from "formik";
import Input from "./Input";
import * as Yup from 'yup';
import {Button, CircularProgress, Stack, Box, Typography, Paper} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default () => {
    const {t} = useTranslation('login');

    const loginValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required(`${t('usernameRequired')}`),
        password: Yup.string()
            .required(`${t('passwordRequired')}`)
    });

    return (
        <Box sx={{
            height: 'calc(100vh - 50px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}>

            <Formik initialValues={{username: '', password: ''}}
                    onSubmit={(values, formikHelpers) => {
                        formikHelpers.setSubmitting(true);

                        setTimeout(() => {
                            formikHelpers.setSubmitting(false);
                            formikHelpers.resetForm();
                        }, 5000)

                    }}
                    validationSchema={loginValidationSchema}

            >

                {props => (

                    <Form>

                        <Paper elevation={3} sx={{p: 2}}>

                            <Stack spacing={2} sx={{width: '500px'}}>

                                <Typography variant="h6"
                                            sx={{textAlign: 'left'}}>
                                    {t('login')}</Typography>

                                <Input name="username"
                                       label={t('username')}
                                       placeholder={t('username')}
                                       error={props.touched.username && !!props.errors.username}/>

                                <Input name="password"
                                       label={t('password')}
                                       placeholder={t('password')}
                                       error={props.touched.password && !!props.errors.password}
                                       type="password"/>

                            </Stack>

                            <Box sx={{mt: 2, textAlign: 'end'}}>

                                {
                                    props.isSubmitting ? <CircularProgress size={30}/> :
                                        <Button size="medium"
                                                variant="contained"
                                                type="submit"
                                                color="primary">
                                            {t('login')}</Button>
                                }

                                <Box variant="outlined" sx={{mt: 2, display: 'flex', justifyContent: 'end'}}>

                                    <Typography sx={{m: 1}}>{t('newToConstruction')}</Typography>
                                    <Button size="medium"
                                            variant="contained"
                                            type="submit"
                                            color="success"
                                            to="/registration"
                                            component={NavLink}
                                    >
                                        {t('registration')}</Button>

                                </Box>

                            </Box>

                        </Paper>

                    </Form>

                )}

            </Formik>

        </Box>
    );
}