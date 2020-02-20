import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login(props) {
    return (
        <div className="pages-bg">
            <LoginForm {...props} />
        </div>
    );
}
