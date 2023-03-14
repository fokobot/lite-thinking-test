import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate(`/login`);
        }
    }, []);

    useEffect(() => {
        let response = makeFetch(token, 'GET', `products/${enterpriseId}`);
        response
            .then(response => response.json())
            .then(response => setProducts(response.data))
    }, []);

    const handleClickPDF = () => {
        let response = makeFetch(token, 'POST', `products/pdf/${enterpriseId}`);
        response
            .then(response => response.json())
            .then(response => window.open(response.data))
    }

    const handleSubmitPDF = (values) => {
        let response = makeFetch(token, 'POST', `products/pdf/${enterpriseId}`, { email: values.email });
        response
            .then(response => response.json())
            .then(response => window.open(response.data))
    }

    return (
        <div>
            <button type="button" onClick={handleClickPDF}>Generate PDF!</button>
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={SedPDFSchema}
                onSubmit={handleSubmitPDF}
            >
                {({ errors, touched }) => (
                    <Form>
                        <Field name="email" type="email" placeholder="Email to send PDF" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
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