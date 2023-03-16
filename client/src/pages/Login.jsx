import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import { Formik, Form, Field } from 'formik';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as Yup from 'yup';
import Link from "@mui/material/Link";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
        .min(6, 'Password is too short!')
        .max(64, 'Password is too long!')
        .required('Required')

});

export const Login = () => {
    const navigate = useNavigate();
    const { token, setToken, errorMessage } = useContext(EnterpriseContext);

    useEffect(() => {
        if (token) {
            navigate(`/user/enterprise`);
        }
    }, [token]);

    const handleSubmitForm = (values) => {
        setToken({ login: values });
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >
            <Grid item xs={3}>
                <Card sx={{ minWidth: 1 / 4 }} className="vertical-center">
                    <CardContent>
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmitForm}
                        >
                            {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                <Form>
                                    <Grid container spacing={3} alignItems="center" direction={'column'}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4">Sign In</Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <TextField onChange={handleChange} name="email" label="Email"
                                                onBlur={handleBlur}
                                                helperText={touched.email && errors.email}
                                                error={touched.email && errors.email} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField onChange={handleChange} name="password" type="password" label="Password"
                                                onBlur={handleBlur}
                                                helperText={touched.password && errors.password}
                                                error={touched.password && errors.password} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button onClick={handleSubmit} type="submit" variant="contained" fullWidth>Login</Button>
                                        </Grid>
                                        <Grid item>
                                            <Link onClick={() => navigate(`/register`)} variant="body2">
                                                Don&apos;t have an account? Sign Up
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};