import React, { useReducer } from 'react';
import { EnterpriseContext } from './EnterpriseContext';
import { EnterpriseReducer } from './EnterpriseReducer';
import {
    SET_TOKEN,
    SET_TOKEN_ERROR,
    REMOVE_TOKEN,
    SET_ENTERPRISE,
    SET_ENTERPRISE_ERROR,
    CREATE_ENTERPRISE,
    CREATE_ENTERPRISE_ERROR,
    EDIT_ENTERPRISE,
    EDIT_ENTERPRISE_ERROR,
    REMOVE_ENTERPRISE,
    REMOVE_ENTERPRISE_ERROR
} from '../../constants/index';
const URL = process.env.VITE_API_URL;

export const EnterpriseState = (props) => {
    const initialState = {
        token: '',
        user: null,
        enterprise: null,
        loadingEnterprise: true
    };

    const [state, dispatch] = useReducer(EnterpriseReducer, initialState);

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
                throw new Error(tokenData);
            }
        } catch (error) {
            dispatch({
                type: SET_TOKEN_ERROR,
                payload: error
            });
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
                throw new Error(enterprise);
            }
        } catch (error) {
            dispatch({
                type: SET_ENTERPRISE_ERROR,
                payload: error
            });
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
                throw new Error(enterprise);
            }
        } catch (error) {
            dispatch({
                type: CREATE_ENTERPRISE_ERROR,
                payload: error
            });
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
                throw new Error(enterprise);
            }
        } catch (error) {
            dispatch({
                type: EDIT_ENTERPRISE_ERROR,
                payload: error
            });
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
                throw new Error(enterprise);
            }
        } catch (error) {
            dispatch({
                type: REMOVE_ENTERPRISE_ERROR,
                payload: error
            });
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