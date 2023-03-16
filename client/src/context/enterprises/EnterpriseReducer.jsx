import {
    SET_INIT,
    SET_TOKEN,
    REMOVE_TOKEN,
    SET_ENTERPRISE,
    CREATE_ENTERPRISE,
    EDIT_ENTERPRISE,
    REMOVE_ENTERPRISE
} from '../../constants/index';

export const EnterpriseReducer = (state, action) => {
    switch (action.type) {
        case SET_INIT:
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                enterprise: action.payload.enterprise
            };
        case SET_TOKEN:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        case REMOVE_TOKEN:
            localStorage.removeItem('token');
            return {
                ...state,
                token: '',
                user: null,
                enterprise: null
            };
        case SET_ENTERPRISE:
            return {
                ...state,
                enterprise: action.payload,
                loadingEnterprise: false
            };
        case CREATE_ENTERPRISE:
            return {
                ...state,
                enterprise: action.payload
            };
        case EDIT_ENTERPRISE:
            return {
                ...state,
                enterprise: action.payload
            };
        case REMOVE_ENTERPRISE:
            return {
                ...state,
                enterprise: null
            };
        default:
            return state;
    }
}