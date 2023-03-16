import React, { useEffect, useReducer } from 'react';
import { EnterpriseContext } from './EnterpriseContext';
import { EnterpriseReducer } from './EnterpriseReducer';
import {
    SET_INIT,
    SET_TOKEN,
    REMOVE_TOKEN,
    SET_ENTERPRISE,
    CREATE_ENTERPRISE,
    EDIT_ENTERPRISE,
    REMOVE_ENTERPRISE
} from '../../constants/index';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const URL = import.meta.env.VITE_API_URL || "http://ec2-100-25-37-66.compute-1.amazonaws.com:4000/";

export const EnterpriseState = (props) => {
    const initialState = {
        token: '',
        user: null,
        enterprise: null,
        loadingEnterprise: true
    };

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

    const [state, dispatch] = useReducer(EnterpriseReducer, initialState);

    // useEffect(() => {
    //     let token = localStorage.getItem('token');
    //     let user = JSON.parse(localStorage.getItem('user'));
    //     let enterprise = JSON.parse(localStorage.getItem('enterprise'));
    //     dispatch({
    //         type: SET_INIT,
    //         payload: { token, user, enterprise }
    //     });
    // }, []);

    // useEffect(() => {
    //     return () => {
    //         localStorage.setItem('token', state.token);
    //         if (state.user) {
    //             localStorage.setItem('user', JSON.stringify(state.user));
    //         }
    //         if (state.enterprise) {
    //             localStorage.setItem('enterprise', JSON.stringify(state.enterprise));
    //         }
    //     }
    // }, [state]);

    const setToken = async (data) => {
        try {
            if (data.register) {
                delete data.register.passwordConfirmation;
                let response = await fetch(`${URL}user/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data.register)
                });
                if (!response.ok) {
                    throw new Error(tokenData);
                }

                data.login = { email: data.register.email, password: data.register.password };
            }
            let response = await fetch(`${URL}user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data.login)
            });
            const tokenData = await response.json();
            if (response.ok) {
                dispatch({
                    type: SET_TOKEN,
                    payload: tokenData.data
                });
            } else {
                throw new Error(tokenData.error);
            }
        } catch (error) {
            notify(error.message);
        }
    }

    const removeToken = async () => {
        dispatch({
            type: REMOVE_TOKEN
        });
    }

    const setEnterprise = async () => {
        try {
            let response = await fetch(`${URL}enterprises/${state.user.id}`, {
                method: 'GET',
                headers: getHeaders(state)
            });
            const enterprise = await response.json();
            if (response.ok) {
                dispatch({
                    type: SET_ENTERPRISE,
                    payload: enterprise.data
                });
            } else {
                throw new Error(enterprise.error);
            }
        } catch (error) {
            // notify(error.message);
        }
    }

    const createEnterprise = async (data) => {
        try {
            let response = await fetch(`${URL}enterprises`, {
                method: 'POST',
                headers: getHeaders(state),
                body: JSON.stringify(data)
            });
            const enterprise = await response.json();
            if (response.ok) {
                dispatch({
                    type: CREATE_ENTERPRISE,
                    payload: enterprise.data
                });
            } else {
                throw new Error(enterprise.error);
            }
        } catch (error) {
            notify(error.message);
        }
    }

    const editEnterprise = async (data) => {
        try {
            let response = await fetch(`${URL}enterprises/${state.enterprise._id}`, {
                method: 'PATCH',
                headers: getHeaders(state),
                body: JSON.stringify(data)
            });
            const enterprise = await response.json();
            if (response.ok) {
                dispatch({
                    type: EDIT_ENTERPRISE,
                    payload: enterprise.data
                });
            } else {
                throw new Error(enterprise.error);
            }
        } catch (error) {
            notify(error.message);
        }
    }

    const removeEnterprise = async () => {
        try {
            let response = await fetch(`${URL}enterprises/${state.enterprise._id}`, {
                method: 'DELETE',
                headers: getHeaders(state)
            });
            const enterprise = await response.json();
            if (response.ok) {
                dispatch({
                    type: REMOVE_ENTERPRISE
                });
            } else {
                throw new Error(enterprise.error);
            }
        } catch (error) {
            notify(error.message);
        }
    }

    return (
        <EnterpriseContext.Provider
            value={{
                token: state.token,
                user: state.user,
                enterprise: state.enterprise,
                loadingEnterprise: state.loadingEnterprise,
                setToken,
                removeToken,
                setEnterprise,
                createEnterprise,
                editEnterprise,
                removeEnterprise
            }}
        >
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
            {props.children}
        </EnterpriseContext.Provider>
    );
}

function getHeaders(state) {
    return {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${state.token}`
    };
}