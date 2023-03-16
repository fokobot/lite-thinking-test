import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import makeFetch from '../utils/fetch';
import { EnterpriseContext } from "../context/enterprises/EnterpriseContext";
import { Navbar } from "../components/Navbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const SedPDFSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
});

export const EnterprisesDetail = (props) => {
    const [products, setProducts] = useState([]);
    const { token } = useContext(EnterpriseContext);
    const [enterprise, setEnterprise] = useState({});
    const { enterpriseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate(`/`);
        }
    }, []);

    useEffect(() => {
        let response = makeFetch(token, 'GET', `products/${enterpriseId}`);
        response
            .then(response => response.json())
            .then(response => setProducts(response.data))

        let enterpriseResponse = makeFetch(token, 'GET', `enterprises/detail/${enterpriseId}`);
        enterpriseResponse
            .then(response => response.json())
            .then(response => {
                setEnterprise(response.data);
            })
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
        <Grid>
            <Navbar />
            <Grid container justify="space-between">
                <Typography sx={{ ml: 2 }} inline="true" variant="body1" align="left" fontWeight={'bold'}>Nit:&nbsp;</Typography>
                <Typography inline="true" align="right" variant="body1">{enterprise.nit}</Typography>
            </Grid>
            <Grid container justify="space-between">
                <Typography sx={{ ml: 2 }} inline="true" variant="body1" align="left" fontWeight={'bold'}>Enterprise Name:&nbsp;</Typography>
                <Typography inline="true" align="right" variant="body1">{enterprise.name}</Typography>
            </Grid>
            <Grid container justify="space-between">
                <Typography sx={{ ml: 2 }} inline="true" variant="body1" align="left" fontWeight={'bold'}>Address:&nbsp;</Typography>
                <Typography inline="true" align="right" variant="body1">{enterprise.address}</Typography>
            </Grid>
            <Grid container justify="space-between">
                <Typography sx={{ ml: 2 }} inline="true" variant="body1" align="left" fontWeight={'bold'}>Phone:&nbsp;</Typography>
                <Typography inline="true" align="right" variant="body1">{enterprise.phone}</Typography>
            </Grid>
            <Grid sx={{ m: 2, display: 'block' }}>
                <Button onClick={handleClickPDF} variant="contained">Generate PDF</Button>
            </Grid>
            <Grid sx={{ my: 2 }}>
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    validationSchema={SedPDFSchema}
                    onSubmit={handleSubmitPDF}
                >
                    {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <Form>
                            <Grid justify="space-between" item xs={12}>
                                <TextField inline="true" onChange={handleChange} name="email" type="email" variant="filled" label="Email to send PDF"
                                    onBlur={handleBlur}
                                    helperText={touched.email && errors.email}
                                    error={touched.email && errors.email} />
                                <Button sx={{ mx: 1 }} inline="true" onClick={handleSubmit} type="submit" variant="contained">Send PDF</Button>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Grid>
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
        </Grid>
    );
};