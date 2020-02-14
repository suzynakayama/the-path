import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar(props) {
    return (
        <div className="NavBar d-flex align-items-center justify-content-center w-100">
            <div className="ml-5 mt-4 d-flex nav-div-icon justify-content-start align-items-center">
                <img
                    src="images/The_Path.jpg"
                    alt="icon"
                    className="nav-icon"
                />
            </div>
            {props.user ? (
                <div className="d-flex justify-content-end align-items-center footer-span left w-40 mt-4">
                    <Link to="/paths" className="NavBar-link">
                        My Paths
                    </Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <Link to="/profile" className="NavBar-link">
                        Profile
                    </Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <Link to="/about" className="NavBar-link">
                        About
                    </Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    <Link
                        to=""
                        className="NavBar-link"
                        onClick={props.handleLogout}
                    >
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="d-flex justify-content-end align-items-center footer-span left w-40 mt-4">
                    <Link to="/" className="NavBar-link">
                        Home
                    </Link>
                    <Link to="/about" className="NavBar-link">
                        About
                    </Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to="/login" className="NavBar-link">
                        Login
                    </Link>
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to="/signup" className="NavBar-link">
                        Sign Up
                    </Link>
                </div>
            )}
        </div>
    );
}
