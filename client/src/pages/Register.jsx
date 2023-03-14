import React, { useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import { Formik, Form, Field } from 'formik';
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
        <div>
            <h1>Signup</h1>
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
                {({ errors, touched }) => (
                    <Form>
                        <Field name="name" placeholder="Full Name" />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <Field name="email" type="email" placeholder="Email" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                        <Field name="password" type="password" placeholder="Password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        <Field name="passwordConfirmation" type="password" placeholder="Comfirm Password" />
                        {errors.passwordConfirmation && touched.passwordConfirmation ? (
                            <div>{errors.passwordConfirmation}</div>
                        ) : null}
                        <button type="submit">SignUp</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};