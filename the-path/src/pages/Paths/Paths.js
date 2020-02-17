import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import PathsCards from "../../components/PathsCards/PathsCards";
import Footer from "../../components/Footer/Footer";

function Paths(props) {
    return (
        <div>
            <NavBar user={props.user} handleLogout={props.handleLogout} />
            <br />
            <div className="main-line"></div>
            <br />
            <PathsCards {...props} />
            <br />
            <Footer />
        </div>
    );
}

export default Paths;
