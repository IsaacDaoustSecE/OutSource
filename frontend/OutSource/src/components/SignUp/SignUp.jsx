import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import useApi from "../../shared/useapi.js";
import Header from "../Header/Header.jsx";
import { Warren } from "../Warren.jsx";

const SignUp = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const { loading, data, error, formError, refetch } = useApi(
        "/users/register",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        },
        { auto: false }
    );

    // Redirect to OTP page
    useEffect(() => {
        if (!data) return;

        // navigate to /otp
        navigate("/otp", {
            state: { email: form.email },
        });
    }, [data, form.email, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            refetch(form); // submit to backend
        },
        [form, refetch]
    );

    return (
        <div className="content-container">
            <div className="left-section">
                <Header showLinks={false} />

                <form className="SignUp-form" onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <h3>Join the marketplace where work finds you</h3>

                    <div
                        className="error"
                        style={{
                            display: error ? "block" : "none",
                            marginBottom: "20px",
                        }}
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

                    <label>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />

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

                    <div className="button-container">
                        <button
                            type="submit"
                            className="CreateAcc-btn"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </div>
                    <div className="LoginButton-container">
                        <button
                            type="submit"
                            className="Login-btn"
                            disabled={loading}
                            onClick={() => navigate("/Login")}
                        >
                            {loading
                                ? "Going to Login Page"
                                : "Already have an account? Log In"}
                        </button>
                    </div>
                </form>
            </div>

            <Warren />
        </div>
    );
};

export default SignUp;
