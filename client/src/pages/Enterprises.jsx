import React, { useEffect, useState, useContext } from 'react';
import { FormEnterprise } from "../components/FormEnterprise";
import { FormProduct } from "../components/FormProduct";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "../components/ProductTable";
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import makeFetch from "../utils/fetch";
import { Navbar } from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';

export const Enterprises = () => {
    const { token, enterprise, loadingEnterprise, setEnterprise, removeEnterprise } = useContext(EnterpriseContext);
    const navigate = useNavigate();

    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isCreatingProduct, setIsCreatingProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState(true);

    const notify = (message) => toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    useEffect(() => {
        if (!token) {
            navigate(`/`);
        }
    }, []);

    useEffect(() => {
        setEnterprise();
    }, []);

    useEffect(() => {
        if (enterprise && newProduct) {
            setNewProduct(false);
            let response = makeFetch(token, 'GET', `products/${enterprise._id}`);
            response
                .then(response => response.json())
                .then(response => setProducts(response.data))
        }
        setIsCreating(false);
        setIsEditing(false);
    }, [enterprise, newProduct]);

    const handleClickCreate = () => {
        setIsCreating(true);
    }

    const handleClickEdit = () => {
        setIsEditing(true);
    }

    const handleClickCreateProduct = () => {
        setIsCreatingProduct(true);
    }

    return (
        <div>
            <Navbar />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <Typography sx={{ ml: 2, mt: 2 }} variant="h4">My enterprise</Typography>
            {loadingEnterprise ? <h1>Loader</h1> : enterprise ?
                <Grid>
                    <Grid align="right" sx={{ mr: 3 }}>
                        <Button onClick={() => navigate(`/enterprises/${enterprise._id}`)} variant="contained">Go to Enterprise Detail</Button>
                    </Grid>
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
                    {
                        !isEditing && <Grid sx={{ m: 2, display: 'block' }}>
                            <Button onClick={handleClickEdit} variant="contained">Edit Enterprise</Button>
                        </Grid>
                    }
                    <FormEnterprise creating={false}
                        initialValues={{ name: enterprise.name, address: enterprise.address, nit: enterprise.nit, phone: enterprise.phone }}
                        setIsOpen={setIsEditing} open={isEditing} />
                    <Grid sx={{ m: 2, display: 'block' }}>
                        <Button onClick={removeEnterprise} variant="contained">Delete Enterprise</Button>
                    </Grid>
                    <Typography sx={{ ml: 2 }} variant="h4">Products</Typography>
                    {
                        !isCreatingProduct && <Grid sx={{ m: 2, display: 'block' }}>
                            <Button onClick={handleClickCreateProduct} variant="contained">Create Product</Button>
                        </Grid>
                    }
                    <FormProduct isCreatingProduct={isCreatingProduct} setIsCreatingProduct={setIsCreatingProduct} setNewProduct={setNewProduct} notify={notify} />
                    <ProductTable sx={{ m: 2 }} products={products} />
                </Grid> :
                <Grid>
                    {
                        !isCreating && <Grid sx={{ m: 2, display: 'block' }}>
                            <Button onClick={handleClickCreate} variant="contained">Create Enterprise</Button>
                        </Grid>
                    }
                    <FormEnterprise creating={true}
                        initialValues={{ name: '', address: '', nit: '', phone: '' }}
                        setIsOpen={setIsCreating} open={isCreating} />
                </Grid>
            }
        </div>
    );
};