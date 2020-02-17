import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class OnePath extends Component {
    constructor() {
        super();
        this.state = {
            day: new Date(),
            city: "",
            notes: "",
            places: []
        };
    }

    path = this.props.path(this.props.match.params.id);

    handleChange = evt => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    };

    handleDate = date => {
        this.setState({
            from: date
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
                <h2 className="text-center">{this.path.country}</h2>
                <br />
                <img className="mx-auto" src="" alt="" />
                <br />
                <h4>From: {this.path.from}</h4>
                <br />
                <h4>To: {this.path.to}</h4>
                <br />
                <h4>Notes: {this.path.notes}</h4>
                <br />
                <button
                    type="button"
                    data-toggle="modal"
                    data-target="#newItinerary"
                    className="btn btn-outline-light mt-4"
                >
                    Add Itinerary
                </button>
                {this.path.itinerary.length ? (
                    this.path.itinerary.map(one => {
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
                                                  <h4>Place: {place.name}</h4>
                                                  <br />
                                                  <img
                                                      src={place.image}
                                                      alt=""
                                                  />
                                                  <br />
                                                  <h4>
                                                      Location: {place.location}
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
                    <h2>No Itinerary Yet.</h2>
                )}
                <div
                    id="newItinerary"
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
                                            selected={this.state.day}
                                            onChange={this.handleDate}
                                        />
                                        <label
                                            for="city"
                                            className="mt-4 mb-4 d-block"
                                        >
                                            City:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            value={this.state.city}
                                            name="city"
                                            onChange={this.handleChange}
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
