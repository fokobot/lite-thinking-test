import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import { Formik, Form, Field } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name is too short!')
        .max(50, 'Name is too long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Password is too short!')
        .max(64, 'Password is too long!')
        .required('Required'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .min(6, 'Password is too short!')
        .max(64, 'Password is too long!')
        .required('Required'),

});

export const Register = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(EnterpriseContext);

    useEffect(() => {
        if (token) {
            navigate(`/user/enterprise`);
        }
    }, [token]);

    const handleSubmit = (values) => {
        setToken({ register: values });
    }

    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, handleChange, handleSubmit }) => (
                <Form>
                    <Grid container spacing={3} alignItems="center" direction={'column'}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Sign Up</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleChange} name="name" label="Name"
                                helperText={touched.name && errors.name}
                                error={touched.name && errors.name} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleChange} name="email" label="Email"
                                helperText={touched.email && errors.email}
                                error={touched.email && errors.email} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleChange} name="password" type="password" label="Password"
                                helperText={touched.password && errors.password}
                                error={touched.password && errors.password} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleChange} name="passwordConfirmation" type="password" label="Password Confirmation"
                                helperText={touched.passwordConfirmation && errors.passwordConfirmation}
                                error={touched.passwordConfirmation && errors.passwordConfirmation} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleSubmit} type="submit" variant="contained" fullWidth>SignUp</Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};