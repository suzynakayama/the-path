import React, { useState, useEffect, Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import userService from "../../utils/userService";
import tokenService from "../../utils/tokenService";
import pathService from "../../utils/pathService";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Paths from "../Paths/Paths";
import OnePath from "../OnePath/OnePath";
import Search from "../Search/Search";
import "./App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            user: userService.getUser(),
            paths: []
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

    handleUpdatePaths = paths => {
        this.setState({ paths });
    };

    getPath = evt => {
        return this.setState({ current: evt.target.dataset.id });
    };

    // Lifecycle Method
    async componentDidMount() {
        if (this.state.user) {
            const paths = await pathService.getAllPaths();
            if (paths.length) {
                this.setState({ paths: paths });
            }
        }
    }

    async componentDidUpdate() {
        const paths = await pathService.getAllPaths();
        if (paths.length) {
            this.setState({ paths: paths });
        }
    }

    render() {
        return (
            <div className="App mx-auto">
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
                                    paths={this.state.paths}
                                    handleUpdatePaths={this.handleUpdatePaths}
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
                                paths={this.state.paths}
                                getPath={this.getPath}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/search"
                        render={() => (
                            <Search
                                handleLogout={this.handleLogout}
                                user={this.state.user}
                            />
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
