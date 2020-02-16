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
    handleSignupOrLogin() {
        this.setState({ user: userService.getUser() });
    }

    handleLogout() {
        userService.logout();
        this.setState({ user: null });
    }

    // getPath(idx) {
    //     return paths[idx];
    // }

    // Lifecycle Method
    // async componentDidMount() {
    //     const paths = await pathService.getAllPaths();
    //     this.setState({ paths });
    // }

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
                        render={() =>
                            userService.getUser() ? (
                                <Paths
                                    handleLogout={this.handleLogout}
                                    user={this.state.user}
                                    paths={this.state.paths}
                                />
                            ) : (
                                <Redirect to="/login" />
                            )
                        }
                    />
                    <Route
                        exact
                        path="/paths/:idx"
                        render={props => (
                            <OnePath
                                {...props}
                                handleLogout={this.handleLogout}
                                user={this.state.user}
                                path={this.getPath}
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
