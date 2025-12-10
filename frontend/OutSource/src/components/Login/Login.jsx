import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../shared/useapi";
import "./Login.css";
import drawing from "../../assets/drawing.png";

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
        if (!data) return;
        console.log(data);

        // navigate("/Home");
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
        <div className="login-container">
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
                </form>
            </div>
            <div className="SignUp-container">
                <button
                    type="submit"
                    className="SignUp-btn"
                    disabled={loading}
                    onClick={() => navigate("/SignUp")}
                >
                    {loading
                        ? "Going to Sign Up Page"
                        : "don't have an account? Sign Up!"}
                </button>
            </div>

            <div className="right-section">
                <img src={drawing} alt="drawing" />
            </div>
        </div>
    );
};

export default Login;
