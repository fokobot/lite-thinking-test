import { redirect } from "react-router-dom";

export const Home = async () => {
    redirect("/login");
    return null;
};