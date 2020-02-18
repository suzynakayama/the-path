import React, { Component } from "react";
import PathCard from "../../components/PathCard/PathCard";
import pathService from "../../utils/pathService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class PathsCards extends Component {
    constructor() {
        super();
        this.state = {
            paths: [],
            form: {
                country: "",
                from: new Date(),
                to: new Date(),
                notes: "",
                itinerary: [],
                user: ""
            }
        };
    }

    handleChange = evt => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [evt.target.name]: evt.target.value
            }
        });
    };

    handleFromDate = date => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                from: date
            }
        });
    };

    handleToDate = date => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                to: date
            }
        });
    };

    handleUpdatePaths = async () => {
        const paths = await pathService.getAllPaths();
        if (paths.length) {
            this.setState({
                ...this.state,
                paths: paths
            });
        }
    };

    handleSubmit = async evt => {
        evt.preventDefault();
        try {
            console.log(this.state.form);
            await pathService.createPath(this.state.form);
            console.log("after create");
            this.props.history.push("/paths");
            this.handleUpdatePaths();
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

    async componentDidMount() {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                user: this.props.user._id
            }
        });
        const paths = await pathService.getAllPaths();
        if (paths.length) {
            this.setState({
                ...this.state,
                paths: paths
            });
        }
    }

    render() {
        return (
            <div className="scroll">
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
                    {this.state.paths.map(path => (
                        <PathCard key={path._id} path={path} />
                    ))}
                </div>
                <div
                    id="newPath"
                    className="modal mx-auto"
                    tabIndex="-1"
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
                                            htmlFor="country"
                                            className="d-block"
                                        >
                                            Country:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            value={this.state.form.country}
                                            name="country"
                                            onChange={this.handleChange}
                                        />
                                        <label className="mt-4 d-block">
                                            From:
                                        </label>
                                        <DatePicker
                                            selected={this.state.form.from}
                                            onChange={this.handleFromDate}
                                        />
                                        <label className="mt-4 d-block">
                                            To:
                                        </label>
                                        <DatePicker
                                            selected={this.state.form.to}
                                            onChange={this.handleToDate}
                                        />
                                        <label
                                            className="mt-4 mb-4 d-block"
                                            htmlFor="notes"
                                        >
                                            Notes:
                                        </label>
                                        <input
                                            type="textarea"
                                            className="form-control"
                                            id="notes"
                                            value={this.state.form.notes}
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
