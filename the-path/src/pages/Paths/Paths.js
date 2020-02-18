import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PathsCards from "../../components/PathsCards/PathsCards";
import Footer from "../../components/Footer/Footer";

class Paths extends Component {
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
                <PathsCards
                    user={this.props.user}
                    history={this.props.history}
                />
                <br />
                <Footer />
            </div>
        );
    }
}

export default Paths;
