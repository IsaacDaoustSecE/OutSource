import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";

function Nav({ selectedRoute }) {
    const location = useLocation();

    return (
        <nav className={styles.nav}>
            <Link
                className={
                    location.pathname.endsWith("/Home")
                        ? styles.selectedRoute
                        : undefined
                }
                to="/"
            >
                Home
            </Link>
            <Link
                className={
                    location.pathname.endsWith("/messages")
                        ? styles.selectedRoute
                        : undefined
                }
                to="/messages"
            >
                Messages
            </Link>
            <Link
                className={
                    location.pathname.endsWith("/jobs")
                        ? styles.selectedRoute
                        : undefined
                }
                to="/jobs"
            >
                Jobs
            </Link>
            <Link
                className={
                    location.pathname.startsWith("/freelancers")
                        ? styles.selectedRoute
                        : undefined
                }
                to="/freelancers"
            >
                Freelancers
            </Link>
        </nav>
    );
}

export default function Header({ showLinks = true }) {
    const { user } = useContext(AuthContext);
    return (
        <header className={styles.root}>
            <p>Signed in as: {user ? user.name : null}</p>
            <h1 className="title">OutSource</h1>
            <p className={styles.subtitle}>
                Hire talent. Get hired. All in one place.
            </p>
            {showLinks && <Nav />}
        </header>
    );
}
