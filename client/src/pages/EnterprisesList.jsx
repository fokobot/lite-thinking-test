import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { FormEnterprise } from "../components/FormEnterprise";
import { useNavigate } from "react-router-dom";
import { EnterpriseContext } from "../context/enterprises/EnterpriseContext";
import makeFetch from '../utils/fetch';

export const EnterprisesList = () => {
    const { token } = useContext(EnterpriseContext);
    const [enterprises, setEnterprises] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate(`/login`);
        }
    }, []);

    useEffect(() => {
        let response = makeFetch(token, 'GET', `enterprises`);
        response
            .then(response => response.json())
            .then(response => setEnterprises(response.data.enterprises))
    }, []);

    const handleClick = (enterpriseId) => {
        navigate(`/enterprises/${enterpriseId}`);
    }

    return (
        <div>
            <h1>Enterprise</h1>
            {enterprises.map(enterprise => {
                return (
                    <card key={enterprise._id} onClick={() => handleClick(enterprise._id)}>
                        <h1>{enterprise.name} - {enterprise.nit}</h1>
                        <p>{enterprise.address}</p>
                        <p>{enterprise.phone}</p>
                    </card>);
            })}

        </div>
    );
};