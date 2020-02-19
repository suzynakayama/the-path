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
                <div className="m-5 p-5 border rounded col-sm-7 mx-auto green">
                    <header>
                        <h2 className="mb-5 font-weight-bold">Sign Up</h2>
                    </header>
                    <form
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                    >
                        <div className="form-group row mx-auto">
                            <label
                                htmlFor="name"
                                className="col-sm-3 col-form-label"
                            >
                                Name:
                            </label>
                            <input
                                type="text"
                                className="form-control col-sm-6 mb-4"
                                id="name"
                                value={this.state.name}
                                name="name"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group row mx-auto">
                            <label
                                htmlFor="email"
                                className="col-sm-3 col-form-label"
                            >
                                Email:
                            </label>
                            <input
                                type="text"
                                className="form-control col-sm-6 mb-4"
                                id="email"
                                value={this.state.email}
                                name="email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group row mx-auto">
                            <label
                                htmlFor="password"
                                className="col-sm-3 col-form-label"
                            >
                                Password:
                            </label>
                            <input
                                type="password"
                                className="form-control col-sm-6 mb-4"
                                id="password"
                                value={this.state.password}
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group row mx-auto">
                            <label
                                htmlFor="confPass"
                                className="col-sm-3 col-form-label"
                            >
                                Confirm Password:
                            </label>
                            <input
                                type="password"
                                className="form-control col-sm-6 mb-4"
                                id="confPass"
                                value={this.state.passwordConf}
                                name="confPass"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                className="btn btn-outline-light "
                                disabled={this.isFormInvalid()}
                            >
                                Submit
                            </button>
                            <Link to="/" className="a-btn ml-5 mt-3">
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignupForm;
