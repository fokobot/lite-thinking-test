import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import makeFetch from '../utils/fetch';
import { EnterpriseContext } from "../context/enterprises/EnterpriseContext";

const SedPDFSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
});

export const EnterprisesDetail = (props) => {
    const [products, setProducts] = useState([]);
    const { token } = useContext(EnterpriseContext);
    const { enterpriseId } = useParams();

    useEffect(() => {
        let response = makeFetch(token, 'GET', `products/${enterpriseId}`);
        response
            .then(response => response.json())
            .then(response => setProducts(response.data))
    }, []);

    return (
        <div>
            <button type="button">Generate PDF!</button>
            <Formik
                initialValues={{
                    pdfEmail: ''
                }}
                validationSchema={SedPDFSchema}
                onSubmit={values => {
                    dispatch({ type: 'SET_TOKEN', login: values })
                    navigate("/enterprises");
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="pdfEmail" type="email" placeholder="Email to send PDF" />
                        {errors.pdfEmail && touched.pdfEmail ? <div>{errors.pdfEmail}</div> : null}
                        <button type="submit">Send PDF</button>
                    </Form>
                )}
            </Formik>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                {products.map(product => {
                    return (
                        <tr key={product._id}>
                            <th>{product.name}</th>
                            <th>{product.price}</th>
                            <th>{product.quantity}</th>
                        </tr>);
                })}
            </table>
        </div>
    );
};