import React, { Component } from "react";
import PathCard from "../../components/PathCard/PathCard";
import pathService from "../../utils/pathService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PathsCards.css";

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
            await pathService.createPath(this.state.form);
            this.props.history.push("/paths");
            this.handleUpdatePaths();
            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    country: "",
                    from: new Date(),
                    to: new Date(),
                    notes: "",
                    itinerary: [],
                    places: []
                }
            });
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
            <div className="scroll pages-bg mymt">
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#newPath"
                    className="btn btn-outline-dark mt-4 mr-5 right"
                >
                    Add Path
                </button>
                <br />
                <br />
                <br />
                <div className="d-flex justify-content-around flex-wrap scroll paths-div">
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
                                    <div className="form-group row mx-auto mt-4 mb-4">
                                        {/* TODO input for google images */}
                                        <label
                                            htmlFor="country"
                                            className="col-sm-3 col-form-label"
                                        >
                                            Country:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control col-sm-7"
                                            id="country"
                                            value={this.state.form.country}
                                            name="country"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group row mx-auto mt-4 mb-4">
                                        <label className=" col-sm-3 col-form-label">
                                            From:
                                        </label>
                                        <DatePicker
                                            selected={this.state.form.from}
                                            onChange={this.handleFromDate}
                                            className="form-control col-sm-7"
                                        />
                                    </div>
                                    <div className="form-group row mx-auto mt-4 mb-4">
                                        <label className=" col-sm-3 col-form-label">
                                            To:
                                        </label>
                                        <DatePicker
                                            selected={this.state.form.to}
                                            onChange={this.handleToDate}
                                            className="form-control col-sm-7"
                                        />
                                    </div>
                                    <div className="form-group row mx-auto mt-4 mb-4">
                                        <label
                                            className="col-sm-3 col-form-label"
                                            htmlFor="notes"
                                        >
                                            Notes:
                                        </label>
                                        <input
                                            type="textarea"
                                            className="form-control col-sm-7"
                                            id="notes"
                                            value={this.state.form.notes}
                                            name="notes"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-outline-dark mt-4"
                                        onClick={this.handleSubmit}
                                        data-dismiss="modal"
                                    >
                                        Submit
                                    </button>
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
