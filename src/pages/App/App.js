import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import userService from "../../utils/userService";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Paths from "../Paths/Paths";
import OnePath from "../OnePath/OnePath";
import Search from "../Search/Search";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: userService.getUser()
        };
    }

    // Helper methods
    handleSignupOrLogin = () => {
        this.setState({ user: userService.getUser() });
    };

    handleLogout = () => {
        userService.logout();
        this.setState({ user: null });
    };

    handleDeleteProfile = () => {
        this.setState({ user: null });
    };

    render() {
        return (
            <div className="App mx-auto">
                <NavBar
                    handleLogout={this.handleLogout}
                    user={this.state.user}
                />
                <br />
                <div className="main-line"></div>
                <br />
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Main
                                handleLogout={this.handleLogout}
                                user={this.state.user}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/signup"
                        render={({ history }) => (
                            <Signup
                                history={history}
                                handleSignupOrLogin={this.handleSignupOrLogin}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={({ history }) => (
                            <Login
                                history={history}
                                handleSignupOrLogin={this.handleSignupOrLogin}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/profile"
                        render={() => (
                            <Profile
                                handleLogout={this.handleLogout}
                                user={this.state.user}
                                handleDeleteProfile={this.handleDeleteProfile}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/paths"
                        render={({ history }) =>
                            userService.getUser() ? (
                                <Paths
                                    history={history}
                                    handleLogout={this.handleLogout}
                                    user={this.state.user}
                                />
                            ) : (
                                <Redirect to="/login" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/paths/:id"
                        render={props => (
                            <OnePath
                                {...props}
                                handleLogout={this.handleLogout}
                                user={this.state.user}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/search"
                        render={props => (
                            <Search
                                {...props}
                                handleLogout={this.handleLogout}
                                user={this.state.user}
                            />
                        )}
                    />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default App;
