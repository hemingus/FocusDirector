"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "../../../components/Navbar/Navbar.module.scss";
import Link from "next/link";
import { useEffect } from "react";

const DashboardNav = () => {
  const { user, loading, logout, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, [])

  if (loading) {
    return (
      <nav className={styles.navbar}>
        <div className={styles.navbar__container}>
          <p>Loading user...</p>
        </div>
      </nav>
    );
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo}>
          <img src="../../assets/fd_logo_nobg.png" alt="focus director logo" />
        </div>

          <div>
            <Link href="/dashboard/projects">
              Projects
            </Link>
          </div>

        <div className={styles.navbar__actions}>
          {user ? (
            <>
              <div>
                <span>{user.name}</span>
                <br />
                <span>{user.email}</span>
              </div>

              <button
                className={`${styles.btn} ${styles.btnOutline}`}
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <p>Not logged in</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;