import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <div className="footer d-flex align-items-center justify-content-center mt-5">
            <p className="d-flex w-100">
                <a
                    href="https://github.com/suzynakayama"
                    className="d-flex justify-content-start align-items-center footer-a"
                >
                    <span className="footer-span">Developed by</span>
                    &nbsp;Suzy Yume&nbsp;
                    <img
                        className="github"
                        src="images/github.png"
                        alt="github"
                    />
                </a>
                <span className="d-flex justify-content-end align-items-center footer-span left">
                    All Rights Reserved &reg;
                </span>
            </p>
        </div>
    );
}
