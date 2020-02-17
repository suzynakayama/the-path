import React from "react";
import { Link } from "react-router-dom";

export default function PathCard(props) {
    let from = props.path.from;
    from = from.slice(0, 10);
    let to = props.path.to;
    to = to.slice(0, 10);

    return (
        <div className="card green col-sm-3 m-4">
            {props.path.image ? (
                <img
                    src={props.path.image}
                    class="card-img-top"
                    alt={props.path.country}
                />
            ) : (
                ""
            )}
            <div className="card-body">
                <h2 className="card-title">{props.path.country}</h2>
                <h5 className="card-text">{`From: ${from}`}</h5>
                <h5 className="card-text">{`To: ${to}`}</h5>
                <Link
                    to={`/paths/${props.path._id}`}
                    className="btn btn-outline-light mt-4"
                >
                    More
                </Link>
            </div>
        </div>
    );
}
