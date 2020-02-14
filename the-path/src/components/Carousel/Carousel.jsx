import React from "react";
import "./Carousel.css";

export default function Carousel() {
    return (
        <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-ride="carousel"
        >
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="/images/RJ-Copy.jpg"
                        className="d-block w-100"
                        alt="rio de janeiro"
                        data-interval="20000"
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="images/Bali-Copy.jpeg"
                        className="d-block w-100"
                        alt="bali"
                        data-interval="20000"
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="images/Forest-Copy.jpg"
                        className="d-block w-100"
                        alt="forest"
                        data-interval="20000"
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="images/Lake-Louise-Copy.jpeg"
                        className="d-block w-100"
                        alt="lake louise"
                        data-interval="20000"
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="images/Punta-Cana-Copy.jpeg"
                        className="d-block w-100"
                        alt="punta cana"
                        data-interval="20000"
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="images/Swiss-Copy.jpeg"
                        className="d-block w-100"
                        alt="swiss"
                        data-interval="20000"
                    />
                </div>
            </div>
            <a
                className="carousel-control-prev"
                href="#carouselExampleFade"
                role="button"
                data-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
            </a>
            <h1 className="sriracha main-phrase">Plan your path...</h1>
            {/* <a
                className="carousel-control-next"
                href="#carouselExampleFade"
                role="button"
                data-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
            </a> */}
        </div>
    );
}
