import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pathService from "../../utils/pathService";
import itineraryService from "../../utils/itineraryService";
import "./OnePath.css";
import Itinerary from "../../components/Itinerary/Itinerary";

class OnePath extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: {},
            form: {
                day: new Date(),
                city: "",
                notes: "",
                places: []
            }
        };
    }

    async componentDidMount() {
        let path = await this.getPath(this.props.match.params.id);
        this.setState({
            ...this.state,
            path: path
        });
        console.log(this.state.path);
    }

    handleUpdate = async () => {
        let path = await this.getPath(this.props.match.params.id);
        this.setState({
            path: path,
            form: {
                day: new Date(),
                city: "",
                notes: "",
                places: []
            }
        });
    };

    getPath = async id => {
        let path = await pathService.getOnePath(id);
        path.from = path.from.slice(0, 10);
        path.to = path.to.slice(0, 10);
        path.itinerary = path.itinerary.map(each => {
            each.day = each.day.slice(0, 10);
            return each;
        });
        return path;
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

    handleDayDate = date => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                day: date
            }
        });
    };

    handleDelete = async () => {
        await pathService.deletePath(this.props.match.params.id);
        this.props.history.push("/paths");
    };

    addItinerary = async evt => {
        evt.preventDefault();
        try {
            await itineraryService.createItinerary(
                this.props.match.params.id,
                this.state.form
            );
            this.props.history.push(`/paths/${this.props.match.params.id}`);
            this.handleUpdate();
        } catch (err) {
            console.log(err);
        }
    };

    handleDeleteItinerary = async iti_id => {
        await itineraryService.deleteItinerary(
            this.props.match.params.id,
            iti_id
        );
        this.props.history.push(`/paths/${this.props.match.params.id}`);
        let path = await this.getPath(this.props.match.params.id);
        this.setState({
            ...this.state,
            path: path
        });
    };

    deletePlace = async placeIdx => {
        let idx = { idx: placeIdx };
        await pathService.deletePlace(this.props.match.params.id, idx);
        let path = await this.getPath(this.props.match.params.id);
        this.setState({
            path: path,
            form: {
                day: new Date(),
                city: "",
                notes: "",
                places: []
            }
        });
    };

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
                <div className="m-5 p-5 border rounded col-sm-6 mx-auto green scroll">
                    <br />
                    <br />
                    {this.state.path ? (
                        <>
                            <h2 className="text-center">
                                <u>{this.state.path.country}</u>
                            </h2>
                            <br />
                            <img className="mx-auto" src="" alt="" />
                            <br />
                            <h4>From: {this.state.path.from}</h4>
                            <br />
                            <h4>To: {this.state.path.to}</h4>
                            <br />
                            {this.state.path.notes ? (
                                <h4>Notes: {this.state.path.notes}</h4>
                            ) : (
                                ""
                            )}
                            <br />
                            {this.state.path.places ? (
                                <>
                                    <h4 className="mb-5">Saved Places</h4>
                                    <ul className="d-flex justify-content-around w-90">
                                        {this.state.path.places.map(
                                            (place, idx) => {
                                                return (
                                                    <li
                                                        key={idx}
                                                        className="col-sm-3"
                                                    >
                                                        <a
                                                            className="white"
                                                            href={place.url}
                                                        >
                                                            {place.name}
                                                            <img
                                                                className="place-image"
                                                                src={
                                                                    place.image
                                                                }
                                                                alt={place.name}
                                                            />
                                                        </a>
                                                        <button
                                                            className="a-btn sml-text"
                                                            onClick={() =>
                                                                this.deletePlace(
                                                                    idx
                                                                )
                                                            }
                                                        >
                                                            Delete Place
                                                        </button>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </>
                            ) : (
                                ""
                            )}
                            <div className="d-flex justify-content-around mt-5 iti-bts-div mx-auto">
                                <button
                                    type="button"
                                    data-toggle="modal"
                                    data-target="#newItinerary"
                                    className="btn btn-outline-light"
                                >
                                    Add Itinerary
                                </button>
                                <button
                                    className="a-btn"
                                    onClick={this.handleDelete}
                                >
                                    Delete Path
                                </button>
                            </div>
                            {this.state.path.itinerary
                                ? this.state.path.itinerary.length
                                    ? this.state.path.itinerary.map(one => (
                                          <Itinerary
                                              one={one}
                                              handleDeleteItinerary={
                                                  this.handleDeleteItinerary
                                              }
                                          />
                                      ))
                                    : ""
                                : ""}
                        </>
                    ) : (
                        <h2>Loading...</h2>
                    )}
                    <br />
                    <br />
                </div>
                <div
                    id="newItinerary"
                    className="modal mx-auto"
                    tabIndex="-1"
                    role="dialog"
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document"
                    >
                        <div className="modal-content green">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Itinerary</h5>
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
                                <form className="" onSubmit={this.addItinerary}>
                                    <div className="form-group">
                                        <label className="d-block">Day:</label>
                                        <DatePicker
                                            selected={this.state.form.day}
                                            onChange={this.handleDayDate}
                                        />
                                        <label
                                            htmlFor="city"
                                            className="mt-4 mb-4 d-block"
                                        >
                                            City:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            value={this.state.form.city}
                                            name="city"
                                            onChange={this.handleChange}
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
                                            data-dismiss="modal"
                                            onClick={this.addItinerary}
                                        >
                                            Add
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <Footer />
            </div>
        );
    }
}

export default OnePath;
