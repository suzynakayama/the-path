import React, { useState } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function Signup(props) {
    return (
        <div>
            <NavBar />
            <SignupForm {...props} />
            <Footer />
        </div>
    );
}

export default Signup;
