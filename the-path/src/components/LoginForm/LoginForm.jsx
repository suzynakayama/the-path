import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";

class LoginPage extends Component {
    state = {
        email: "",
        password: ""
    };

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    handleSubmit = async evt => {
        evt.preventDefault();
        try {
            await userService.login(this.state);
            this.props.handleSignupOrLogin();
            this.props.history.push("/");
        } catch (err) {
            // Use a modal or toast in your apps instead of alert
            //"Invalid Credentials!";
        }
    };

    render() {
        return (
            <div className="mt-5">
                <div className="m-5 p-5 border rounded col-sm-8 mx-auto green">
                    <header>
                        <h2 className="mb-5 font-weight-bold">Login</h2>
                    </header>
                    <form
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                    >
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
                                type="text"
                                className="form-control col-sm-6 mx-auto mb-4"
                                id="password"
                                value={this.state.password}
                                name="password"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <div className="col-sm-12 text-center">
                                <button className="btn btn-outline-light mt-4">
                                    Log In
                                </button>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link
                                    className="btn btn-outline-light mt-4"
                                    to="/"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;
