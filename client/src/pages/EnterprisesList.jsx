import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { EnterpriseContext } from "../context/enterprises/EnterpriseContext";
import { Navbar } from "../components/Navbar";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import makeFetch from '../utils/fetch';

export const EnterprisesList = () => {
    const { token } = useContext(EnterpriseContext);
    const [enterprises, setEnterprises] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate(`/`);
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
        <Grid>
            <Navbar />
            <Typography sx={{ ml: 2, mt: 2 }} variant="h4">Enterprise List</Typography>
            {enterprises.map(enterprise => {
                return (
                    <Card sx={{
                        m: 2, ':hover': {
                            boxShadow: 20,
                        }
                    }} key={enterprise._id} onClick={() => handleClick(enterprise._id)}>
                        <CardContent>
                            <Grid>
                                <Grid container justify="space-between">
                                    <Typography sx={{ ml: 2 }} inline="true" variant="body1" align="left" fontWeight={'bold'}>{enterprise.name} - Nit: {enterprise.nit}</Typography>
                                </Grid>
                                <Grid container justify="space-between">
                                    <Typography sx={{ ml: 2 }} inline="true" variant="body1" align="left" fontWeight={'bold'}>Address:&nbsp;</Typography>
                                    <Typography inline="true" align="right" variant="body1">{enterprise.address}</Typography>
                                </Grid>
                                <Grid container justify="space-between">
                                    <Typography sx={{ ml: 2 }} inline="true" variant="body1" align="left" fontWeight={'bold'}>Phone:&nbsp;</Typography>
                                    <Typography inline="true" align="right" variant="body1">{enterprise.phone}</Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>);
            })}

        </Grid>
    );
};