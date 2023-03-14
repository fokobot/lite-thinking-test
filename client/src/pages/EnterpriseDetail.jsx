import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import makeFetch from '../utils/fetch';
import { EnterpriseContext } from "../context/enterprises/EnterpriseContext";
import { Navbar } from "../components/Navbar";

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
            <Navbar />
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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow
                                key={product.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{product.name}</TableCell>
                                <TableCell align="right">{product.price}</TableCell>
                                <TableCell align="right">{product.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};