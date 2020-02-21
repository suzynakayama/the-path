import React from "react";
import SignupForm from "../../components/SignupForm/SignupForm";

function Signup(props) {
    return (
        <div>
            <div className="pages-bg">
                <SignupForm {...props} />
            </div>
        </div>
    );
}

export default Signup;
