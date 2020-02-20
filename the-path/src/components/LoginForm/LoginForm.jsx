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
            console.log(err);
        }
    };

    render() {
        return (
            <div>
                <div className="m-5 p-5 border rounded col-sm-6 mx-auto green basic-top-margin">
                    <header>
                        <h2 className="mb-5 font-weight-bold">Login</h2>
                    </header>
                    <form
                        className="form-horizontal"
                        onSubmit={this.handleSubmit}
                    >
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
                        <div className="form-group">
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-dark">
                                    Log In
                                </button>
                                <Link className="a-btn ml-5 mt-3" to="/">
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
