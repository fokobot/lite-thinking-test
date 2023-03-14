import React from 'react';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const CreateProductSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Name is too short!')
        .max(256, 'Name is too long!')
        .required('Required'),
    quantity: Yup.number(),
    price: Yup.number()
});

export const FormProduct = () => {
    useEffect(() => {
        // data fetching here
    }, []);

    const [enterprise, setEnterprise] = useState({});
    const [isCreating, setIsLoading] = useState(true);

    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    quantity: '',
                    price: ''
                }}
                validationSchema={CreateProductSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="name" placeholder="Product Name" />
                        {errors.name && touched.name ? (
                            <div>{errors.name}</div>
                        ) : null}
                        <Field name="quantity" placeholder="Product Quantity" />
                        {errors.quantity && touched.quantity ? <div>{errors.quantity}</div> : null}
                        <Field name="price" placeholder="Product Price" />
                        {errors.price && touched.price ? (
                            <div>{errors.price}</div>
                        ) : null}
                        <button type="submit">Save Product</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};