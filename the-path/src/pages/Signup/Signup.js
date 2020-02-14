import React from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

export default function Signup() {
    return (
        <div>
            <NavBar />
            <SignupForm />
            <Footer />
        </div>
    );
}
