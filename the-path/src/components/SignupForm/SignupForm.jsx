import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";
import "../LoginForm/LoginForm.css";

class SignupForm extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        confPass: ""
    };

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    handleSubmit = async evt => {
        evt.preventDefault();
        try {
            await userService.signup(this.state);
            this.props.handleSignupOrLogin();
            this.props.history.push("/");
        } catch (err) {
            console.log(err);
        }
    };

    isFormInvalid() {
        return !(
            this.state.name &&
            this.state.email &&
            this.state.password === this.state.confPass
        );
    }

    render() {
        return (
            <div className="mt-5">
                <div className="m-5 p-5 border rounded col-sm-8 mx-auto green">
                    <header>
                        <h2 className="mb-5 font-weight-bold">Sign Up</h2>
                    </header>
                    <form
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="name" className="mb-4">
                                Name:
                            </label>
                            <input
                                type="text"
                                className="form-control col-sm-6 mx-auto mb-4"
                                id="name"
                                value={this.state.name}
                                name="name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="mb-4">
                                Email:
                            </label>
                            <input
                                type="text"
                                className="form-control col-sm-6 mx-auto mb-4"
                                id="email"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="mb-4">
                                Password:
                            </label>
                            <input
                                type="password"
                                className="form-control col-sm-6 mx-auto mb-4"
                                id="password"
                                value={this.state.password}
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confPass" className="mb-4">
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                className="form-control col-sm-6 mx-auto mb-4"
                                id="confPass"
                                value={this.state.passwordConf}
                                name="confPass"
                                onChange={this.handleChange}
                            />
                        </div>
                        <button
                            className="btn btn-outline-light mt-4"
                            disabled={this.isFormInvalid()}
                        >
                            Submit
                        </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Link to="/" className="btn btn-outline-light mt-4">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignupForm;
