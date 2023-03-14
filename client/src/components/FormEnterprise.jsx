import React from 'react';
import { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import * as Yup from 'yup';

const CreateEnterpriseSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Name is too short!')
        .max(256, 'Name is too long!')
        .required('Required'),
    address: Yup.string()
        .min(6, 'Address is too short!')
        .max(256, 'Address is too long!')
        .required('Required'),
    nit: Yup.string()
        .test('len', 'Nit is too short!', val => val.length > 5)
        .test('len', 'Nit is too long!', val => val.length < 33)
        .required('Required'),
    phone: Yup.string()
        .test('len', 'Phone is too short!', val => val.length > 5)
        .test('len', 'Phone is too long!', val => val.length < 17)
        .required('Required')

});

export const FormEnterprise = ({ creating, initialValues }) => {
    const { createEnterprise, editEnterprise } = useContext(EnterpriseContext);

    const handleSubmit = (values) => {
        if (creating) {
            createEnterprise(values);
        } else {
            editEnterprise(values);
        }
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={CreateEnterpriseSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="name" placeholder="Enterprise Name" />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <Field name="address" placeholder="Address" />
                        {errors.address && touched.address ? <div>{errors.address}</div> : null}
                        <Field name="nit" placeholder="Enterprise Nit" />
                        {errors.nit && touched.nit ? (
                            <div>{errors.nit}</div>
                        ) : null}
                        <Field name="phone" placeholder="Phone Number" />
                        {errors.phone && touched.phone ? (
                            <div>{errors.phone}</div>
                        ) : null}
                        <button type="submit">Save Enterprise</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};