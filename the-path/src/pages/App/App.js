import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import userService from "../../utils/userService";
import tokenService from "../../utils/tokenService";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Paths from "../Paths/Paths";
import OnePath from "../OnePath/OnePath";
import Search from "../Search/Search";
import "./App.css";

function App() {
    const [user, setUser] = useState({ user: userService.getUser() });

    // Help functions

    function handleSignupOrLogin() {
        setUser({ user: userService.getUser() });
    }

    function handleLogout() {
        userService.logout();
        setUser({ user: null });
    }

    return (
        <div className="App mx-auto">
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <Main handleLogout={handleLogout} user={user} />
                    )}
                />
                <Route
                    exact
                    path="/signup"
                    render={({ history }) => (
                        <Signup
                            history={history}
                            handleSignupOrLogin={handleSignupOrLogin}
                        />
                    )}
                />
                <Route
                    exact
                    path="/login"
                    render={({ history }) => (
                        <Login
                            history={history}
                            handleSignupOrLogin={handleSignupOrLogin}
                        />
                    )}
                />
                <Route exact path="/profile" render={() => <Profile />} />
                <Route exact path="/paths" render={() => <Paths />} />
                <Route exact path={`/paths/:id`} render={() => <OnePath />} />
                <Route exact path="/search" render={() => <Search />} />
            </Switch>
        </div>
    );
}

export default App;
