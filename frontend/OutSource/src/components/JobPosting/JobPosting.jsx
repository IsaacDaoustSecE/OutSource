import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Warren } from "../Warren.jsx";
import "./JobPosting.css";
import { useEffect } from "react";

const JobPosting = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        expected_duration_days: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = "Create a New Job";
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                ...form,
                price: Number(form.price),
                expected_duration_days: Number(form.expected_duration_days),
            };

            const response = await fetch("http://localhost:3000/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.message || "Failed to submit the job posting");
                setLoading(false);
                return;
            }

            navigate("/home");
        } catch (err) {
            console.error("Submission failed:", err);
            setError("Submission failed. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="content-container">
            <div className="left-section">
                <form className="JobPosting-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="error" style={{ marginBottom: "20px" }}>
                            <p>{error}</p>
                        </div>
                    )}

                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />

                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />

                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />

                    <label>Expected Duration (days)</label>
                    <input
                        type="number"
                        name="expected_duration_days"
                        value={form.expected_duration_days}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />

                    <div className="Submit-container">
                        <button
                            type="submit"
                            className="Submit-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Submitting Posting..."
                                : "Submit Posting"}
                        </button>
                    </div>
                </form>
            </div>
            <Warren />
        </div>
    );
};

export default JobPosting;
