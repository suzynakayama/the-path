import React, { Component } from "react";
import PathsCards from "../../components/PathsCards/PathsCards";

class Paths extends Component {
    render() {
        return (
            <div>
                <PathsCards
                    user={this.props.user}
                    history={this.props.history}
                />
                <br />
            </div>
        );
    }
}

export default Paths;
