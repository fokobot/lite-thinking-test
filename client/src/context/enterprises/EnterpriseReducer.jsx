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

export const EnterpriseReducer = (state, action) => {
    switch (action.type) {
        case SET_TOKEN:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user
            };
        case SET_TOKEN_ERROR:
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
        case SET_ENTERPRISE_ERROR:
            return {
                ...state,
                loadingEnterprise: false
            };
        case CREATE_ENTERPRISE:
            return {
                ...state,
                enterprise: action.payload
            };
        case CREATE_ENTERPRISE_ERROR:
        case EDIT_ENTERPRISE:
            return {
                ...state,
                enterprise: action.payload
            };
        case EDIT_ENTERPRISE_ERROR:
        case REMOVE_ENTERPRISE:
            return {
                ...state,
                enterprise: null
            };
        case REMOVE_ENTERPRISE_ERROR:
        default:
            return state;
    }
}