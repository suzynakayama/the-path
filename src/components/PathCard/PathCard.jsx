import React from "react";
import { Link } from "react-router-dom";

export default function PathCard(props) {
    let from = props.path.from;
    from = from.slice(0, 10);
    let to = props.path.to;
    to = to.slice(0, 10);

    return (
        <div className="card green col-sm-3 m-4 card-each p-3">
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
                <p className="card-title font-weight-bold basic-title ">
                    {props.path.country}
                </p>
                <div className="card-date">
                    <h5 className="card-text">{`From: ${from}`}</h5>
                    <h5 className="card-text">{`To: ${to}`}</h5>
                </div>
                <Link
                    to={`/paths/${props.path._id}`}
                    className="btn btn-outline-dark mt-4 card-more"
                >
                    More
                </Link>
            </div>
        </div>
    );
}
