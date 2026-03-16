"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <a href="/" className={styles.navbar__logo}>
          <img src="./assets/fd_logo_nobg.png" />
        </a>



          <div className={`${styles.navbar__actions} ${styles.mobile}`}>
            <button
              className={`${styles.btn} ${styles.btnOutline}`}
              onClick={() => router.push("/login")}
            >
              Login
            </button>

            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => router.push("/register")}
            >
              Sign Up
            </button>
          </div>
       

        <div className={`${styles.navbar__actions} ${styles.desktop}`}>
          <button
            className={`${styles.btn} ${styles.btnOutline}`}
            onClick={() => router.push("/login")}
          >
            Login
          </button>

          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => router.push("/register")}
          >
            Sign Up
          </button>
        </div>

        <div
          className={styles.navbar__toggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>
    </nav>
  );
}