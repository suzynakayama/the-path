import React, { Component } from "react";

class SignupForm extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        ConfPass: ""
    };

    render() {
        return (
            <div>
                <header>Sign Up</header>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input type="text" className="form-control" />
                    </div>
                    <button className="btn btn-outline-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default SignupForm;
