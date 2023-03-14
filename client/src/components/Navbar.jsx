import React, { useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { EnterpriseContext } from "../context/enterprises/EnterpriseContext";
export const Navbar = () => {
    const pathname = window.location.pathname;
    const { token, setToken } = useContext(EnterpriseContext);

    // useEffect(() => {
    //     if (localStorage.getItem("token") !== token) {
    //         setToken();
    //     }
    // }, []);
    return pathname === '/login' || pathname === '/register' ? (<h1>Lite Thinking Test</h1>) : (
        < nav >
            <h1>Lite Thinking Test</h1>
            <ul>
                <li>My Enterprise</li>
                <li>Enterprise List</li>
                <li>Logout</li>
            </ul>
        </nav >
    );
}

export default Navbar;