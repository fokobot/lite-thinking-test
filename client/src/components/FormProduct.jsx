import React from 'react';
import { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import makeFetch from '../utils/fetch';

const CreateProductSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, 'Name is too short!')
        .max(256, 'Name is too long!')
        .required('Required'),
    quantity: Yup.number(),
    price: Yup.number()
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export const FormProduct = ({ isCreatingProduct, setIsCreatingProduct, setNewProduct, notify }) => {
    const { token } = useContext(EnterpriseContext);

    const handleSubmitProduct = (values) => {
        let response = makeFetch(token, 'POST', `products`, values);
        response
            .then(response => response.json())
            .then(response => {
                if (response.data) {
                    setNewProduct(true);
                    setIsCreatingProduct(false);
                } else {
                    notify(response.message || response.error);
                }
            })
    }

    return (
        <Modal
            open={isCreatingProduct}
            onClose={() => setIsCreatingProduct(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Formik
                    initialValues={{
                        name: '',
                        quantity: '',
                        price: ''
                    }}
                    validationSchema={CreateProductSchema}
                    onSubmit={handleSubmitProduct}
                >
                    {({ errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <Form>
                            <Grid container spacing={3} alignItems="center" direction={'column'}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">Create product</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleChange} name="name" label="Product Name"
                                        onBlur={handleBlur}
                                        helperText={touched.name && errors.name}
                                        error={touched.name && errors.name} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleChange} name="quantity" type="number" label="Product Quantity"
                                        onBlur={handleBlur}
                                        helperText={touched.quantity && errors.quantity}
                                        error={touched.quantity && errors.quantity} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleChange} name="price" type="number" label="Product Price"
                                        onBlur={handleBlur}
                                        helperText={touched.price && errors.price}
                                        error={touched.price && errors.price} />
                                </Grid>
                                <Grid justify="space-between" item xs={12}>
                                    <Button sx={{ mx: 1 }} inline="true" onClick={() => setIsCreatingProduct(false)} variant="contained" color="error">Cancel</Button>
                                    <Button sx={{ mx: 1 }} inline="true" onClick={handleSubmit} type="submit" variant="contained">Save Product</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box >
        </Modal >
    );
};