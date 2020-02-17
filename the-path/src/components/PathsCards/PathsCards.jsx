import React, { Component } from "react";
import PathCard from "../../components/PathCard/PathCard";
import pathService from "../../utils/pathService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PathsCards extends Component {
    constructor() {
        super();
        this.state = {
            country: "",
            from: new Date(),
            to: new Date(),
            notes: "",
            itinerary: [],
            user: ""
        };
    }

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    handleFromDate = date => {
        this.setState({
            from: date
        });
    };

    handleToDate = date => {
        this.setState({
            to: date
        });
    };

    handleSubmit = async evt => {
        evt.preventDefault();
        try {
            await pathService.createPath(this.state);
            this.props.history.push("/paths");
            // this.setState({
            //     country: "",
            //     from: new Date(),
            //     to: new Date(),
            //     notes: "",
            //     itinerary: [],
            //     user: ""
            // });
        } catch (err) {
            console.log(err);
        }
    };

    componentDidMount() {
        this.setState({ user: this.props.user._id });
    }

    // async componentDidUpdate() {
    //     await pathService.getAllPaths();
    // }

    render() {
        return (
            <div>
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#newPath"
                    className="btn btn-outline-info mt-4 mr-5 right"
                >
                    Add Path
                </button>
                <br />
                <br />
                <br />
                <div className="d-flex justify-content-around flex-wrap">
                    {this.props.paths.map(path => (
                        <PathCard key={path.id} path={path} />
                    ))}
                </div>
                <div
                    id="newPath"
                    className="modal mx-auto"
                    tabindex="-1"
                    role="dialog"
                    ref={this.modalRef}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content green">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Path</h5>
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        {/* TODO input for images */}
                                        <label
                                            for="country"
                                            className="d-block"
                                        >
                                            Country:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            value={this.state.country}
                                            name="country"
                                            onChange={this.handleChange}
                                        />
                                        <label className="mt-4 d-block">
                                            From:
                                        </label>
                                        <DatePicker
                                            selected={this.state.from}
                                            onChange={this.handleFromDate}
                                        />
                                        <label className="mt-4 d-block">
                                            To:
                                        </label>
                                        <DatePicker
                                            selected={this.state.to}
                                            onChange={this.handleToDate}
                                        />
                                        <label
                                            className="mt-4 mb-4 d-block"
                                            for="notes"
                                        >
                                            Notes:
                                        </label>
                                        <input
                                            type="textarea"
                                            className="form-control"
                                            id="notes"
                                            value={this.state.notes}
                                            name="notes"
                                            onChange={this.handleChange}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-outline-light mt-4"
                                            onClick={this.handleSubmit}
                                            data-dismiss="modal"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PathsCards;
