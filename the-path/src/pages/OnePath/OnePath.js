import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pathService from "../../utils/pathService";

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

    getPath = async id => {
        let path = await pathService.getOnePath(id);
        path.from = path.from.slice(0, 10);
        path.to = path.to.slice(0, 10);
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

    handleDate = date => {
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                from: date
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
                <div className="m-5 p-5 border rounded col-sm-8 mx-auto green">
                    <br />
                    <br />
                    {this.state.path ? (
                        <>
                            <h2 className="text-center">
                                {this.state.path.country}
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
                            <button
                                type="button"
                                data-toggle="modal"
                                data-target="#newItinerary"
                                className="btn btn-outline-light mt-4"
                            >
                                Add Itinerary
                            </button>
                            {this.state.path.itinerary ? (
                                this.state.path.itinerary.length ? (
                                    this.state.path.itinerary.map(one => {
                                        return (
                                            <>
                                                <h4>Day {one.day}</h4>
                                                <br />
                                                <h4>City: {one.city}</h4>
                                                <br />
                                                {one.places
                                                    ? one.places.map(place => {
                                                          return (
                                                              <>
                                                                  <h4>
                                                                      Place:{" "}
                                                                      {
                                                                          place.name
                                                                      }
                                                                  </h4>
                                                                  <br />
                                                                  <img
                                                                      src={
                                                                          place.image
                                                                      }
                                                                      alt={
                                                                          place.name
                                                                      }
                                                                  />
                                                                  <br />
                                                                  <h4>
                                                                      Location:{" "}
                                                                      {
                                                                          place.location
                                                                      }
                                                                  </h4>
                                                              </>
                                                          );
                                                      })
                                                    : ""}
                                                <h4>Notes:</h4>
                                                <br />
                                                <p>{one.notes}</p>
                                            </>
                                        );
                                    })
                                ) : (
                                    ""
                                )
                            ) : (
                                <h2>No itineraries yet.</h2>
                            )}
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
                                <form className="" onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label className="d-block">Day:</label>
                                        <DatePicker
                                            selected={this.state.form.day}
                                            onChange={this.handleDate}
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
