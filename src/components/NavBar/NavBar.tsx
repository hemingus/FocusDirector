"use client"

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from "./Navbar.module.scss";


export default function Navbar() {
const [isOpen, setIsOpen] = useState(false);

    return (     
        <nav className={styles.navbar}>
            <div className={styles.navbar__container}>
                <a href="/LandingPage" className={styles.navbar__logo}>Focus Director</a>
                <ul className={`${styles.navbar__links} ${isOpen ? styles.navbar__linksOpen : ""}`}>
                    <li><a href="/Testroute">Home</a></li>
                    <li><a href="/LandingPage">Projects</a></li>
                    <li><a href="/">Tutorial</a></li>
                    <li><a href="/">About</a></li>
                    <div className={`${styles.navbar__actions} ${styles.mobile}`}>
                        <button className={`${styles.btn} ${styles.btnOutline}`}>Login</button>
                        <button className={`${styles.btn} ${styles.btnPrimary}`}>Sign Up</button>
                    </div>
                </ul>
                <div className={`${styles.navbar__actions} ${styles.desktop}`}>
                    <button className={`${styles.btn} ${styles.btnOutline}`}>Login</button>
                    <button className={`${styles.btn} ${styles.btnPrimary}`}>Sign Up</button>
                </div>
                <div className={styles.navbar__toggle} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>
        </nav>
    );
}