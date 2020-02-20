import React, { Component } from "react";
import userService from "../../utils/userService";
import { Redirect } from "react-router-dom";
import "./profile.css";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: `${this.props.user.name}`,
            email: `${this.props.user.email}`,
            isDeleted: false
        };
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    handleSubmit = async evt => {
        evt.preventDefault();
        try {
            await userService.updateUser(this.state);
            this.props.history.push("/profile");
        } catch (err) {
            console.log(err);
        }
    };

    handleDelete = async evt => {
        evt.preventDefault();
        try {
            await userService.deleteUser(this.props.user);
            this.setState({ isDeleted: true });
            this.props.handleDeleteProfile();
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        if (this.state.isDeleted) {
            return <Redirect to="/" />;
        } else {
            return (
                <div className="pages-bg">
                    <div className="m-5 p-5 border rounded col-sm-6 mx-auto green basic-top-margin">
                        <header>
                            <h2 className="basic-title font-weight-bold profile-title">
                                {this.props.user.name}'s Profile
                            </h2>
                        </header>
                        <br />
                        <form
                            onSubmit={this.handleSubmit}
                            className="form-horizontal"
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
                                    email="email"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-outline-dark mt-4"
                                    onClick={this.handleSubmit}
                                >
                                    Update
                                </button>
                                <button
                                    className="a-btn ml-5 mt-4"
                                    onClick={this.handleDelete}
                                >
                                    Delete Account
                                </button>
                            </div>
                        </form>
                    </div>
                    <br />
                </div>
            );
        }
    }
}

export default Profile;
