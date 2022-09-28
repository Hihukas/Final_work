import {Form, Formik} from "formik";
import Input from "./Input";
import * as Yup from 'yup';
import {Button, CircularProgress, Stack, Box, Typography, Paper} from "@mui/material";
import {NavLink} from "react-router-dom";

const loginValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required.'),
    password: Yup.string()
        .required('Password is required.')
})

export default () => {

    return (
        <Box sx={{height: 'calc(100vh - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>

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
                                    Login</Typography>

                                <Input name="username"
                                       label="Username"
                                       placeholder="Username"
                                       error={props.touched.username && !!props.errors.username}/>

                                <Input name="password"
                                       label="Password"
                                       placeholder="Password"
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
                                            Login</Button>
                                }

                                <Box variant="outlined" sx={{mt: 2, display: 'flex', justifyContent: 'end'}}>

                                    <Typography sx={{m: 1}}>New to construction?</Typography>
                                    <Button size="medium"
                                            variant="contained"
                                            type="submit"
                                            color="success"
                                            to="/registration"
                                            component={NavLink}
                                    >
                                        Registration</Button>

                                </Box>

                            </Box>

                        </Paper>

                    </Form>

                )}

            </Formik>

        </Box>
    );
}