"use client"

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.scss";


export default function Navbar() {
const [isOpen, setIsOpen] = useState(false);


    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__logo">Focus Director</div>

                <ul className={`navbar__links ${isOpen ? "active" : ""}`}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">Contact</a></li>
                    <div className="navbar__actions mobile">
                        <button className="btn btn--outline">Login</button>
                        <button className="btn btn--primary">Sign Up</button>
                    </div>
                </ul>


                <div className="navbar__actions desktop">
                    <button className="btn btn--outline">Login</button>
                    <button className="btn btn--primary">Sign Up</button>
                </div>


                <div className="navbar__toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>
        </nav>
    );
}