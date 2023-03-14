import React, { useEffect, useState, useContext } from 'react';
import { FormEnterprise } from "../components/FormEnterprise";
import { FormProduct } from "../components/FormProduct";
import { ProductTable } from "../components/ProductTable";
import { EnterpriseContext } from '../context/enterprises/EnterpriseContext';
import makeFetch from "../utils/fetch";

export const Enterprises = () => {
    const { token, enterprise, loadingEnterprise, setEnterprise } = useContext(EnterpriseContext);
    useEffect(() => {
        setEnterprise();
    }, []);

    useEffect(() => {
        if (enterprise && newProduct) {
            let response = makeFetch(token, 'GET', `products/${enterprise._id}`);
            response
                .then(response => response.json())
                .then(response => setProducts(response.data))
        }
        setIsCreating(false);
        setIsEditing(false);
        setIsRemoving(false);
    }, [enterprise]);

    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState(true);

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
            <h1>Enterprise</h1>
            {loadingEnterprise ? <h1>Loader</h1> : enterprise ?
                <div>
                    <h1>Nit: {enterprise.nit}</h1>
                    <h1>Enterprise Name: {enterprise.name}</h1>
                    <h1>Address: {enterprise.address}</h1>
                    <h1>Phone: {enterprise.phone}</h1>
                    {isEditing ? <FormEnterprise creating={false} initialValues={{ name: enterprise.name, address: enterprise.address, nit: enterprise.nit, phone: enterprise.phone }} /> : <button type="button" onClick={handleClickEdit}>Edit Enterprise</button>}
                    {isRemoving || isEditing || isCreating ? <div></div> : <button type="button" onClick={handleClickDelete}>Delete Enterprise</button>}
                    <h1>Products</h1>
                    <h1>Create Product</h1>
                    <FormProduct newProduct={newProduct} setNewProduct={setNewProduct} />
                    <h1>Products Inventory</h1>
                    <ProductTable products={products} />
                </div> :
                <div>
                    {isCreating ? <FormEnterprise creating={true} initialValues={{ name: '', address: '', nit: '', phone: '' }} /> : <button type="button" onClick={handleClickCreate}>Create Enterprise</button>}
                </div>
            }
        </div>
    );
};