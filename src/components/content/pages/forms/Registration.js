import {Form, Formik} from "formik";
import Input from "./Input";
import * as Yup from 'yup';
import {Button, CircularProgress, Stack, Box, Typography, Paper} from "@mui/material";
import {useTranslation} from "react-i18next";

export default () => {
    const {t} = useTranslation('registration');

    const registrationValidationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, `${t('usernameMin')}`)
            .max(20, `${t('usernameMax')}`)
            .required(`${t('usernameRequired')}`),
        password: Yup.string()
            .min(5, `${t('passwordMin')}`)
            .max(20, `${t('passwordMax')}`)
            .required(`${t('passwordRequired')}`),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], `${t('passwordsNotEqual')}`)
            .required(`${t('repeatPasswordRequired')}`)
    });

    return (
        <Box sx={{
            height: 'calc(100vh - 50px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        }}>

            <Formik initialValues={{username: '', password: '', repeatPassword: ''}}
                    onSubmit={(values, formikHelpers) => {
                        formikHelpers.setSubmitting(true);

                        setTimeout(() => {
                            formikHelpers.setSubmitting(false);
                            formikHelpers.resetForm();
                        }, 5000)

                    }}
                    validationSchema={registrationValidationSchema}
            >

                {props => (

                    <Form>

                        <Paper elevation={3} sx={{p: 2}}>

                            <Stack spacing={2} sx={{width: '500px'}}>

                                <Typography variant="h6"
                                            sx={{textAlign: 'left'}}>
                                    {t('registration')}</Typography>

                                <Input name="username"
                                       label={t('username')}
                                       placeholder={t('username')}
                                       error={props.touched.username && !!props.errors.username}/>

                                <Input name="password"
                                       label={t('password')}
                                       placeholder={t('password')}
                                       error={props.touched.password && !!props.errors.password}
                                       type="password"/>

                                <Input name="repeatPassword"
                                       label={t('repeatPassword')}
                                       placeholder={t('repeatPassword')}
                                       error={props.touched.repeatPassword && !!props.errors.repeatPassword}
                                       type="password"/>

                            </Stack>

                            <Box sx={{mt: 2, textAlign: 'end'}}>
                                {
                                    props.isSubmitting ? <CircularProgress size={30}/> :
                                        <Button size="medium"
                                                variant="contained"
                                                type="submit"
                                                color="primary">
                                            {t('register')}</Button>
                                }
                            </Box>

                        </Paper>

                    </Form>

                )}

            </Formik>

        </Box>
    );
}