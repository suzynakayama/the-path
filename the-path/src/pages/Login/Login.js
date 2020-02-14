import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

export default function Login() {
    return (
        <div>
            <NavBar />
            <LoginForm />
            <Footer />
        </div>
    );
}
