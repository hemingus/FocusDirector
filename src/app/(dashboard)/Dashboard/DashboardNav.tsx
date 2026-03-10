"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "../../../components/Navbar/Navbar.module.scss";

const DashboardNav = () => {
  const { user, loading, logout } = useAuth();

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
          <h2>Dashboard</h2>
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