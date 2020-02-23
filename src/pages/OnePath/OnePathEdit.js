import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import pathService from "../../utils/pathService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class OnePathEdit extends Component {
    constructor() {
        super();
        this.state = {
            path: {},
            form: {
                country: "",
                from: new Date(),
                to: new Date(),
                notes: ""
            },
            isModified: false
        };
    }

    async componentDidMount() {
        let thisPath = await this.getPath(this.props.match.params.id);
        this.setState({
            ...this.state,
            path: thisPath
        });
        this.handleUpdate();
    }

    getPath = async id => {
        let path = await pathService.getOnePath(id);
        return path;
    };

    handleUpdate = async () => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                country: this.state.path.country,
                notes: this.state.path.notes
            }
        });
    };

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

    handleSubmit = async evt => {
        evt.preventDefault();
        try {
            await pathService.getOnePathAndUpdate(
                this.state.path._id,
                this.state.form
            );
            this.setState({
                ...this.path,
                isModified: true
            });
        } catch (err) {
            console.log(err);
        }
    };

    handleDelete = async () => {
        await pathService.deletePath(this.props.match.params.id);
        this.props.history.push("/paths");
    };

    render() {
        return this.state.isModified ? (
            <Redirect to={`/paths/${this.props.match.params.id}`} />
        ) : (
            <div className="pages-bg edit-bg">
                <Link
                    to={`/paths/${this.state.path._id}`}
                    className="btn btn-outline-dark mt-4 mr-5 right"
                >
                    Back
                </Link>
                {this.state.path ? (
                    <div className="m-4 p-5 border rounded col-sm-6 mx-auto green">
                        <header>
                            <h2 className="basic-title font-weight-bold profile-title">
                                Edit {this.state.path.country}'s Path
                            </h2>
                        </header>
                        <br />
                        <form
                            onSubmit={this.handleSubmit}
                            className="form-horizontal"
                        >
                            <div className="form-group row mx-auto">
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
                            <div className="d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-outline-dark mt-4"
                                    onClick={this.handleSubmit}
                                >
                                    Save
                                </button>
                                <button
                                    className="a-btn ml-5 mt-4"
                                    onClick={this.handleDelete}
                                >
                                    Delete Path
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <h2>Loading...</h2>
                )}
            </div>
        );
    }
}

export default OnePathEdit;
