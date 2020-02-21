import React from "react";
import Carousel from "../../components/Carousel/Carousel";
import "./Main.css";

function Main(props) {
    return (
        <div>
            <Carousel />
            <div className="main-div border rounded-lg shadow col-sm-7 mx-auto p-5 mb-5 text-center">
                <h4 className="mb-4">Are you planning a trip?</h4>
                <h4 className="mb-4">
                    Feeling overwhelmed with all the papers and documents?
                </h4>
                <h4 className="mb-4">
                    Well, here you can find you’re path and plan your trip...
                </h4>
                <h4>Let's plan your next destination!</h4>
            </div>
            <br />
        </div>
    );
}

export default Main;
