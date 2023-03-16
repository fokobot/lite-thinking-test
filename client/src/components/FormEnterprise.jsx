import React from 'react';
import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';

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

export const FormEnterprise = ({ creating, initialValues, setIsOpen, open }) => {
    const { createEnterprise, editEnterprise } = useContext(EnterpriseContext);

    const handleSubmitEnterprise = (values) => {
        if (creating) {
            createEnterprise(values);
        } else {
            editEnterprise(values);
        }
    }
    return (
        <Modal
            open={open}
            onClose={() => setIsOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={CreateEnterpriseSchema}
                    onSubmit={handleSubmitEnterprise}
                >
                    {({ errors, touched, values, handleChange, handleBlur, handleSubmit }) => (
                        <Form>
                            <Grid container spacing={3} alignItems="center" direction={'column'}>
                                <Grid item xs={12}>
                                    <Typography variant="h4">{creating ? 'Create' : 'Edit'} Enterprise</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleChange} name="name" defaultValue={values.name} label="Enterprise Name"
                                        onBlur={handleBlur}
                                        helperText={touched.name && errors.name}
                                        error={touched.name && errors.name} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleChange} name="address" defaultValue={values.address} label="Address"
                                        onBlur={handleBlur}
                                        helperText={touched.address && errors.address}
                                        error={touched.address && errors.address} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleChange} name="nit" defaultValue={values.nit} label="Enterprise Nit"
                                        onBlur={handleBlur}
                                        helperText={touched.nit && errors.nit}
                                        error={touched.nit && errors.nit} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleChange} name="phone" defaultValue={values.phone} label="Phone Number"
                                        onBlur={handleBlur}
                                        helperText={touched.phone && errors.phone}
                                        error={touched.phone && errors.phone} />
                                </Grid>
                                <Grid justify="space-between" item xs={12}>
                                    <Button sx={{ mx: 1 }} inline="true" onClick={() => setIsOpen(false)} variant="contained" color="error">Cancel</Button>
                                    <Button sx={{ mx: 1 }} inline="true" onClick={handleSubmit} type="submit" variant="contained">Save Enterprise</Button>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box >
        </Modal >
    );
};