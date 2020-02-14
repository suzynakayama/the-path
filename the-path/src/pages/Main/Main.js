import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Carousel from "../../components/Carousel/Carousel";
import Footer from "../../components/Footer/Footer";
import "./Main.css";

function Main(props) {
    return (
        <div>
            <NavBar user={props.user} handleLogout={props.handleLogout} />
            <br />
            <div className="main-line"></div>
            <br />
            <Carousel />
            <div className="main-div border rounded-lg shadow col-sm-7 mx-auto p-5 mb-5">
                <h4 className="text-center">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Sit ipsum nostrum est, aspernatur quis consequatur expedita
                    dolores. Minus asperiores fugiat, distinctio aspernatur
                    autem exercitationem ipsa quis, iusto eaque a mollitia?
                </h4>
            </div>
            <Footer />
        </div>
    );
}

export default Main;
