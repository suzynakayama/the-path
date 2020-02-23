import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: ""
        };
        this.toastRef = React.createRef();
    }

    closeToast = () => {
        this.toastRef.current.classList.remove("show");
        this.setState({
            email: "",
            password: ""
        });
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
            this.toastRef.current.classList.add("show");
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
                <div
                    className="toast toast-div mx-auto"
                    role="alert"
                    aria-live="assertive"
                    aria-atomic="true"
                    ref={this.toastRef}
                >
                    <div className="toast-header">
                        <strong className="mr-auto">Oh!</strong>
                        <button
                            type="button"
                            className="ml-2 mb-1 close"
                            data-dismiss="toast"
                            aria-label="Close"
                            onClick={this.closeToast}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="toast-body">
                        Your credentials appear not to be right. Please, try
                        again.
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
