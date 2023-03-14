import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import { Formik, Form, Field } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Password is too short!')
        .max(64, 'Password is too long!')
        .required('Required')

});

export const Login = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(EnterpriseContext);

    useEffect(() => {
        if (token) {
            navigate(`/user/enterprise`);
        }
    }, [token]);

    const handleSubmitForm = (values) => {
        setToken({ login: values });
    }

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmitForm}
        >
            {({ errors, touched, handleChange, handleSubmit }) => (
                <Form>
                    <Grid container spacing={3} alignItems="center" direction={'column'}>
                        <Grid item xs={12}>
                            <Typography variant="h4">Sign In</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField onChange={handleChange} name="email" label="Email"
                                helperText={errors.email}
                                error={errors.email} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={handleChange} name="password" type="password" label="Password"
                                helperText={errors.password}
                                error={errors.password} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={handleSubmit} type="submit" variant="contained" fullWidth>Login</Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};