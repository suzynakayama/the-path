import React, { Component } from "react";
import userService from "../../utils/userService";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: `${this.props.user.name}`,
            email: `${this.props.user.email}`
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
            console.log(this.state);
            await userService.updateUser(this.state);
            this.props.history.push("/profile");
        } catch (err) {
            console.log(err);
        }
    };

    handleDelete = async () => {
        try {
            console.log(this.state);
            await userService.deleteUser(this.state);
            this.props.history.push("/");
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div>
                <NavBar
                    user={this.props.user}
                    handleLogout={this.props.handleLogout}
                />
                <br />
                <div className="main-line"></div>
                <br />
                <div className="m-5 p-5 border rounded col-sm-8 mx-auto green">
                    <header>
                        <h2>{this.props.user.name}'s Profile</h2>
                    </header>
                    <br />
                    <button
                        className="btn btn-outline-light mt-4 mr-5 right"
                        onClick={this.handleDelete}
                    >
                        Delete Account
                    </button>
                    <br />
                    <form
                        onSubmit={this.handleSubmit}
                        className="form-horizontal"
                    >
                        <div className="form-group">
                            <label for="name" className="d-block mb-4">
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
                            <label for="email" className="d-block mb-4">
                                Email:
                            </label>
                            <input
                                type="text"
                                className="form-control col-sm-6 mx-auto mb-4"
                                id="email"
                                value={this.state.email}
                                email="email"
                                onChange={this.handleChange}
                            />
                            <button
                                type="submit"
                                className="btn btn-outline-light mt-4"
                                onClick={this.handleSubmit}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
                <br />
                <Footer />
            </div>
        );
    }
}

export default Profile;
