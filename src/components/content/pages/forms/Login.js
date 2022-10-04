import {Form, Formik} from "formik";
import Input from "./Input";
import * as Yup from 'yup';
import {Button, CircularProgress, Stack, Box, Typography, Paper, Alert} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {login} from "../../../../api/loginApi";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {addUser} from "../../../../store/slices/user/userSlice";

export default () => {
    const [notification, setNotification] = useState({isVisible: false});
    const {t} = useTranslation('login');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginValidationSchema = Yup.object().shape({
        username: Yup.string()
            .required(`${t('usernameRequired')}`),
        password: Yup.string()
            .required(`${t('passwordRequired')}`)
    });

    const onLogin = (data, formikHelpers) => {
        login(data)
            .then(({data, headers}) => {
                dispatch(addUser({
                    user: data,
                    token: headers.authorization
                }));
                navigate('/');
            })
            .catch(() => setNotification({
                isVisible: true,
                message: `${t('loginNotificationError')}`,
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

            <Formik initialValues={{username: '', password: ''}}
                    onSubmit={onLogin}
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

                                {
                                    notification.isVisible &&
                                    <Alert severity={notification.severity}>{notification.message}</Alert>
                                }

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