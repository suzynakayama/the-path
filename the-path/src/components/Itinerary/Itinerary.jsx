import React from "react";
import "./Itinerary.css";

export default function Itinerary(props) {
    return (
        <>
            <div
                className="border rounded green col-sm-4 m-4 p-3 scroll itinerary-div"
                key={props.one._id}
            >
                <button
                    className="btn right"
                    onClick={() => props.handleDeleteItinerary(props.one._id)}
                >
                    X
                </button>
                <h5>Day: {props.one.day}</h5>
                <br />
                <h5>City: {props.one.city}</h5>
                <br />
                {props.one.places.length > 0 ? (
                    <>
                        <h5>
                            <u>Places</u>
                        </h5>
                        <div className="d-flex flex-wrap justify-content-around">
                            {props.one.places.map((place, idx) => {
                                let placeArr = place.split(",");
                                let placeName = placeArr[0];
                                let placeUrl = placeArr[1];
                                return (
                                    <a
                                        className="border rounded col-sm-4 m-2 p-2"
                                        key={idx}
                                        href={placeUrl}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        <p>{placeName}</p>
                                    </a>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <h5>You have no saved places yet.</h5>
                )}
                <br />
                <div className="line mb-2" />
                <h5>Notes:</h5>
                <br />
                <p>{props.one.notes}</p>
            </div>
        </>
    );
}
