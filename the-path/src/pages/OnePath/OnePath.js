import React, { Component } from "react";
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

    handleCheckbox = evt => {
        if (evt.target.checked) {
            let newPlace = evt.target.value;
            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    places: [...this.state.form.places, newPlace]
                }
            });
        } else {
            let name = evt.target.value.split(",")[0];
            let index = this.state.form.places.indexOf(name);
            if (index !== -1) this.state.form.places.splice(index, 1);
        }
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
        this.handleUpdate();
    };

    render() {
        return (
            <div className="pages-bg">
                <div className="m-5 p-5 border rounded col-sm-10 mx-auto green scroll one-path-div basic-top-margin">
                    <br />
                    <br />
                    <div className="sections-div d-flex">
                        <section className="path-section-left">
                            {this.state.path ? (
                                <>
                                    <h2 className="basic-title">
                                        <strong>
                                            <u>{this.state.path.country}</u>
                                        </strong>
                                    </h2>
                                    <br />
                                    <img className="mx-auto" src="" alt="" />
                                    <br />
                                    <div className="d-flex justify-content-around w-50 mx-auto">
                                        <h4>
                                            <strong>From:</strong>
                                            &nbsp;&nbsp;{this.state.path.from}
                                        </h4>
                                        <h4>
                                            <strong>To:</strong>
                                            &nbsp;&nbsp;{this.state.path.to}
                                        </h4>
                                    </div>
                                    <br />
                                    {this.state.path.notes ? (
                                        <div>
                                            <h4>
                                                <strong>Notes:</strong>
                                            </h4>
                                            <p className="align-left">
                                                {this.state.path.notes}
                                            </p>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                    <br />
                                    <div className="d-flex justify-content-around mt-5 iti-bts-div mx-auto mb-5">
                                        <button
                                            type="button"
                                            data-toggle="modal"
                                            data-target="#newItinerary"
                                            className="btn btn-outline-dark"
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
                                    <div className="line mb-2" />
                                    <div className="d-flex justify-content-around flex-wrap">
                                        {this.state.path.itinerary
                                            ? this.state.path.itinerary.length
                                                ? this.state.path.itinerary.map(
                                                      one => (
                                                          <Itinerary
                                                              one={one}
                                                              handleDeleteItinerary={
                                                                  this
                                                                      .handleDeleteItinerary
                                                              }
                                                          />
                                                      )
                                                  )
                                                : ""
                                            : ""}
                                    </div>
                                </>
                            ) : (
                                <h2>Loading...</h2>
                            )}
                        </section>
                        <section className="path-section-right">
                            <h4 className="mb-5">
                                <strong>Saved Places</strong>
                            </h4>
                            {this.state.path.places ? (
                                this.state.path.places.length > 0 ? (
                                    <>
                                        <div className="scroll">
                                            <ul className="d-flex justify-content-around flex-wrap">
                                                {this.state.path.places.map(
                                                    (place, idx) => {
                                                        return (
                                                            <li
                                                                key={idx}
                                                                className="col-sm-5"
                                                            >
                                                                <a
                                                                    className="place-name"
                                                                    href={
                                                                        place.url
                                                                    }
                                                                >
                                                                    {place.name}
                                                                    <img
                                                                        className="place-image place-image-mh mt-2"
                                                                        src={
                                                                            place.image
                                                                        }
                                                                        alt={
                                                                            place.name
                                                                        }
                                                                    />
                                                                </a>
                                                                <button
                                                                    className="a-btn sml-text mt-1"
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
                                        </div>
                                    </>
                                ) : (
                                    <h5>You didn't save any place yet...</h5>
                                )
                            ) : (
                                ""
                            )}
                        </section>
                    </div>
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
                                    <div className="form-group row mx-auto mb-4 mt-4">
                                        <label className="col-sm-3 col-form-label">
                                            Day:
                                        </label>
                                        <DatePicker
                                            selected={this.state.form.day}
                                            onChange={this.handleDayDate}
                                            className="form-control col-sm-7"
                                        />
                                    </div>
                                    <div className="form-group row mx-auto mb-4 mt-4">
                                        <label
                                            htmlFor="city"
                                            className="col-sm-3 col-form-label"
                                        >
                                            City:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control col-sm-7"
                                            id="city"
                                            value={this.state.form.city}
                                            name="city"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="form-group mx-auto mb-4 mt-4">
                                        <label className="d-block">
                                            Choose the places you want to visit
                                            on this day:
                                        </label>
                                        {this.state.path.places ? (
                                            this.state.path.places.length ? (
                                                this.state.path.places.map(
                                                    (place, idx) => {
                                                        return (
                                                            <div
                                                                key={idx}
                                                                className="form-check"
                                                            >
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id={
                                                                        place.name
                                                                    }
                                                                    value={`${place.name},${place.url}`}
                                                                    onClick={
                                                                        this
                                                                            .handleCheckbox
                                                                    }
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor={
                                                                        place.name
                                                                    }
                                                                >
                                                                    {place.name}
                                                                </label>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <h5>
                                                    You have no saved places
                                                    yet.
                                                </h5>
                                            )
                                        ) : (
                                            <h5>
                                                You have no saved places yet.
                                            </h5>
                                        )}
                                    </div>
                                    <div className="form-group row mx-auto mb-4 mt-4">
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
                                        data-dismiss="modal"
                                        onClick={this.addItinerary}
                                    >
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default OnePath;
