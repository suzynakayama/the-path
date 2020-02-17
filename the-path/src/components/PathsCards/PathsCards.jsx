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
            itinerary: []
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
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div>
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#newPath"
                    className="btn btn-outline-info mt-4"
                >
                    Add Path
                </button>
                <div className="card-deck">
                    {this.props.paths.map(path => (
                        <PathCard key={path.id} path={path} />
                    ))}
                </div>
                <div
                    id="newPath"
                    className="modal mx-auto"
                    tabindex="-1"
                    role="dialog"
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
                                <form className="" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
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
