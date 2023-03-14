import React from 'react';
import { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import * as Yup from 'yup';
import makeFetch from '../utils/fetch';

const CreateProductSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Name is too short!')
        .max(256, 'Name is too long!')
        .required('Required'),
    quantity: Yup.number(),
    price: Yup.number()
});

export const FormProduct = ({newProduct, setNewProduct}) => {
    const { token } = useContext(EnterpriseContext);

    const handleSubmit = (values) => {
        let response = makeFetch(token, 'POST', `products`, values);
        response
            .then(response => response.json())
            .then(response => setNewProduct(true))
    }

    return (
        <div>
            <Formik
                initialValues={{
                    name: '',
                    quantity: '',
                    price: ''
                }}
                validationSchema={CreateProductSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="name" placeholder="Product Name" />
                        {errors.name && touched.name && (<div>{errors.name}</div>)}
                        <Field name="quantity" placeholder="Product Quantity" />
                        {errors.quantity && touched.quantity && <div>{errors.quantity}</div>}
                        <Field name="price" placeholder="Product Price" />
                        {errors.price && touched.price && (<div>{errors.price}</div>)}
                        <button type="submit">Save Product</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};