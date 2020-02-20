import React from "react";

export default function Itinerary(props) {
    return (
        <>
            <div
                className="border rounded mt-5 ml-3 mr-3 p-4 itinerary-div mx-auto"
                key={props.one._id}
            >
                <button
                    className="btn btn-outline-light right"
                    onClick={() => props.handleDeleteItinerary(props.one._id)}
                >
                    X
                </button>
                <h5>Day: {props.one.day}</h5>
                <br />
                <h5>City: {props.one.city}</h5>
                <br />
                <h5>
                    <u>Places</u>
                </h5>
                <p>
                    ADD PLACE.NAME - check how to save the places in the day
                    without having to save it twice
                </p>
                <br />
                {props.one.places
                    ? props.one.places.map(place => (
                          <div key={place._id}>
                              <h6>Place: {place.name}</h6>
                              <br />
                              <img src={place.image} alt={place.name} />
                              <br />
                              <h6>Location: {place.location}</h6>
                          </div>
                      ))
                    : ""}
                <div className="line mb-2" />
                <h5>Notes:</h5>
                <br />
                <p>{props.one.notes}</p>
            </div>
        </>
    );
}
