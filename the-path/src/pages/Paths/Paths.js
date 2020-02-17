import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import PathsCards from "../../components/PathsCards/PathsCards";
import Footer from "../../components/Footer/Footer";
import pathService from "../../utils/pathService";

class Paths extends Component {
    // async componentDidMount() {
    //     console.log(this.props.state.paths);
    //     const paths = await pathService.getAllPaths();
    //     if (paths.length) {
    //         this.props.handleUpdatePaths(paths);
    //     }
    // }

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
                    paths={this.props.paths}
                    handleUpdatePaths={this.props.handleUpdatePaths}
                    history={this.props.history}
                />
                <br />
                <Footer />
            </div>
        );
    }
}

export default Paths;
