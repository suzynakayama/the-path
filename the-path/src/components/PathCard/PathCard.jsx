import React from "react";
import { Link } from "react-router-dom";

export default function PathCard(props) {
    return (
        <div className="card">
            <img
                src={props.path.image}
                class="card-img-top"
                alt={props.path.country}
            />
            <div className="card-body">
                <h5 className="card-title">{props.path.country}</h5>
                <p className="card-text">
                    {`From: ${props.path.from} To: ${props.path.to}`}
                </p>
                <Link
                    to={`/paths/:${props.path.id}`}
                    className="btn btn-outline-light mt-4"
                >
                    More
                </Link>
            </div>
        </div>
    );
}
