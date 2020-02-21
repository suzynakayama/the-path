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
        </div>
    );
}
