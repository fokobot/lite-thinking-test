import React, { useEffect, useState, useContext } from 'react';
import { FormEnterprise } from "../components/FormEnterprise";
import { FormProduct } from "../components/FormProduct";
import { useNavigate } from "react-router-dom";
import { ProductTable } from "../components/ProductTable";
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import makeFetch from "../utils/fetch";
import { Navbar } from "../components/Navbar";

export const Enterprises = () => {
    const { token, enterprise, loadingEnterprise, setEnterprise } = useContext(EnterpriseContext);
    const navigate = useNavigate();

    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate(`/login`);
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
        setIsRemoving(false);
    }, [enterprise, newProduct]);

    const handleClickCreate = () => {
        setIsCreating(true);
    }

    const handleClickEdit = () => {
        setIsEditing(true);
    }

    const handleClickDelete = () => {
        setIsRemoving(true);
    }

    return (
        <div>
            <Navbar />
            <Typography variant="h4">My enterprise</Typography>
            {loadingEnterprise ? <h1>Loader</h1> : enterprise ?
                <div>
                    <Grid container justify="space-between">
                        <Typography inline variant="body1" align="left" fontWeight={'bold'}>Nit: </Typography>
                        <Typography inline align="right" variant="body1"> {enterprise.nit}</Typography>
                    </Grid>
                    <Grid container justify="space-between">
                        <Typography inline variant="body1" align="left" fontWeight={'bold'}>Enterprise Name: </Typography>
                        <Typography inline align="right" variant="body1"> {enterprise.name}</Typography>
                    </Grid>
                    <Grid container justify="space-between">
                        <Typography inline variant="body1" align="left" fontWeight={'bold'}>Address: </Typography>
                        <Typography inline align="right" variant="body1"> {enterprise.address}</Typography>
                    </Grid>
                    <Grid container justify="space-between">
                        <Typography inline variant="body1" align="left" fontWeight={'bold'}>Phone: </Typography>
                        <Typography inline align="right" variant="body1"> {enterprise.phone}</Typography>
                    </Grid>
                    {isEditing ? <FormEnterprise creating={false} initialValues={{ name: enterprise.name, address: enterprise.address, nit: enterprise.nit, phone: enterprise.phone }} /> : <button type="button" onClick={handleClickEdit}>Edit Enterprise</button>}
                    {!(isRemoving || isEditing || isCreating) && <button type="button" onClick={handleClickDelete}>Delete Enterprise</button>}
                    <Typography variant="h4">Products</Typography>
                    <Typography variant="h4">Create Product</Typography>
                    <FormProduct setNewProduct={setNewProduct} />
                    <ProductTable products={products} />
                </div> :
                <div>
                    {isCreating ? <FormEnterprise creating={true} initialValues={{ name: '', address: '', nit: '', phone: '' }} /> : <button type="button" onClick={handleClickCreate}>Create Enterprise</button>}
                </div>
            }
        </div>
    );
};