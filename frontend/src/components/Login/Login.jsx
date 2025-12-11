import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../shared/useapi";
import "./Login.css";
import { Warren } from "../Warren";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const { loading, data, error, formError, refetch } = useApi(
        "/users/login",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        },
        { auto: false }
    );

    useEffect(() => {
        document.title = "Login";
    }, []);

    useEffect(() => {
        if (!data) return;
        console.log(data);

        navigate("/");
    }, [data, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            refetch(form);
        },
        [form, refetch]
    );

    return (
        <div className="content-container">
            <div className="left-section">
                <h1 className="title">OutSource</h1>
                <p className="subtitle">
                    Hire talent. Get hired. All in one place.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    <div
                        className="error"
                        style={{ display: error ? "block" : "none" }}
                    >
                        <p>{error}</p>
                        <ul
                            style={{
                                display: formError?.length ? "block" : "none",
                            }}
                        >
                            {formError?.map((e, i) => (
                                <li key={i}>{e.message}</li>
                            ))}
                        </ul>
                    </div>

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                        onClick={() => navigate("/signup")}
                        style={{ marginLeft: "1rem" }}
                    >
                        {loading
                            ? "Going to Sign Up Page"
                            : "Don't have an account? Sign Up!"}
                    </button>
                </form>
            </div>
            <div className="right-section">
                <Warren />
            </div>
        </div>
    );
};

export default Login;
