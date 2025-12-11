import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import { FreelancerCard } from "../Freelancers/Freelancers";
import { Job } from "../Jobs/Jobs";
import Header from "../Header/Header";
import { Warren } from "../Warren";

const BASE = import.meta.env.VITE_BACKEND_BASE;

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [freelancers, setFreelancers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "OutSource";
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                const initialJobs = await fetch(BASE + "/jobs").then((res) =>
                    res.json()
                );
                const initialFreelancers = await fetch(
                    BASE + "/freelancers"
                ).then((res) => res.json());

                setJobs(initialJobs);
                setFreelancers(initialFreelancers);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="content-container">
            <div className="left-section">
                <Header />

                <SectionTitle
                    title="Latest Jobs"
                    time={`Showing ${jobs.length} job(s)`}
                />

                {jobs.map((job) => (
                    <Job key={job._id} job={job} />
                ))}

                <div style={{ marginTop: "40px" }}>
                    <SectionTitle
                        title="Latest Freelancers"
                        time={`Showing ${freelancers.length} freelancer(s)`}
                    />
                </div>

                {freelancers.map((freelancer) => (
                    <div
                        key={freelancer._id}
                        onClick={() =>
                            navigate("/freelancers/" + freelancer._id)
                        }
                    >
                        <FreelancerCard freelancer={freelancer} />
                    </div>
                ))}
            </div>

            <div className="right-section">
                <Warren />
            </div>
        </div>
    );
}

function SectionTitle({ title, time }) {
    return (
        <div className="section-title">
            <div className="section-header">
                <span>{title}</span>
                <Link to="#!">View All</Link>
            </div>
            <p className="updated-time">{time}</p>
        </div>
    );
}
