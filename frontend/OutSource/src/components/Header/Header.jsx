import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";

function Nav({ selectedRoute }) {
    const location = useLocation();
    console.log(location);

    return (
        <nav className={styles.nav}>
            <a
                className={
                    location.pathname.endsWith("/")
                        ? styles.selectedRoute
                        : undefined
                }
                href="/"
            >
                Home
            </a>
            <a
                className={
                    location.pathname.endsWith("/messages")
                        ? styles.selectedRoute
                        : undefined
                }
                href="/messages"
            >
                Messages
            </a>
            <a
                className={
                    location.pathname.endsWith("/jobs")
                        ? styles.selectedRoute
                        : undefined
                }
                href="/jobs"
            >
                Jobs
            </a>
            <a
                className={
                    location.pathname.endsWith("/freelancers")
                        ? styles.selectedRoute
                        : undefined
                }
                href="/freelancers"
            >
                Freelancers
            </a>
        </nav>
    );
}

export default function Header({ selectedRoute }) {
    return (
        <header className={styles.root}>
            <h1 className="title">OutSource</h1>
            <p className="subtitle">
                Hire talent. Get hired. All in one place.
            </p>
            <Nav />
        </header>
    );
}
