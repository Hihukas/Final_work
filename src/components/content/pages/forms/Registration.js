import {Form, Formik} from "formik";
import Input from "./Input";
import * as Yup from 'yup';
import {Button, CircularProgress, Stack, Box, Typography, Paper} from "@mui/material";

const registrationValidationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username should be not less than 3 letters.')
        .max(20, 'Username should be not more than 20 letters.')
        .required('Username is required.'),
    password: Yup.string()
        .min(5, 'Password should be not less than 5 symbols.')
        .max(20, 'Password should be not more than 20 symbols.')
        .required('Password is required.'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords don't match!")
        .required('Repeat password is required.')
})

export default () => {

    return (
        <Box sx={{height: 'calc(100vh - 50px)', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>

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
                                    Registration</Typography>

                                <Input name="username"
                                       label="Username"
                                       placeholder="Username"
                                       error={props.touched.username && !!props.errors.username}/>

                                <Input name="password"
                                       label="Password"
                                       placeholder="Password"
                                       error={props.touched.password && !!props.errors.password}
                                       type="password"/>

                                <Input name="repeatPassword"
                                       label="Repeat password"
                                       placeholder="Repeat password"
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
                                            Register</Button>
                                }
                            </Box>

                        </Paper>

                    </Form>

                )}

            </Formik>

        </Box>
    );
}