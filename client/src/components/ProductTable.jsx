import React from 'react';

export const ProductTable = ({ products }) => {
    return (
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
    );
};