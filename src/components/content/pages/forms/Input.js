import {FormControl, FormHelperText, TextField} from "@mui/material";
import {ErrorMessage, Field} from "formik";

export default ({name, label, error, placeholder, ...props}) => {
    return (
        <FormControl error={error}>
            <Field id={name}
                   name={name}
                   label={label}
                   placeholder={placeholder}
                   as={TextField}
                   error={error}
                   {...props}/>
            <ErrorMessage name={name}
                          component={FormHelperText}/>
        </FormControl>
    );
}