import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Enterprises } from "./pages/Enterprises";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { EnterprisesDetail } from "./pages/EnterpriseDetail";
import { EnterpriseState } from "./context/enterprises/EnterpriseState";
import { EnterprisesList } from "./pages/EnterprisesList";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "user/enterprise",
        element: <Enterprises />,
    },
    {
        path: "/enterprises/:enterpriseId",
        element: <EnterprisesDetail />,
    },
    {
        path: "/enterprises",
        element: <EnterprisesList />,
    },
]);

function App() {
    return <div className="App">
        <EnterpriseState>
            <Navbar />
            <RouterProvider router={router} />
        </EnterpriseState>
    </div>;
}

export default App;
