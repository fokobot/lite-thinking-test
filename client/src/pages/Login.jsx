import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import { Formik, Form, Field } from 'formik';
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
            // navigate(`/user/enterprise`);
            navigate(`/enterprises`);
        }
    }, [token]);

    const handleSubmit = (values) => {
        setToken({ login: values });
    }

    return (
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="email" type="email" placeholder="Email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <Field name="password" type="password" placeholder="Password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        <button type="submit">Login</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};