import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import drawing from "../../assets/drawing.png";
import "./Home.css";
import { Freelancer } from "../Freelancers/Freelancers";
import { Job } from "../Jobs/Jobs";
import Header from "../Header/Header";

const BASE = "http://localhost:3000";

export default function Home() {
    const [jobs, setJobs] = useState([]);
    const [freelancers, setFreelancers] = useState([]);

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
                    time="Updated maybe 30 mins ago"
                />

                {jobs.map((job) => (
                    <Job key={job._id} job={job} />
                ))}

                <div style={{ marginTop: "40px" }}>
                    <SectionTitle
                        title="Latest Freelancers"
                        time="Updated idk probably 6 mins"
                    />
                </div>

                {freelancers.map((freelancer) => (
                    <Freelancer key={freelancer._id} freelancer={freelancer} />
                ))}
            </div>

            <div className="right-section">
                <img
                    src={drawing}
                    alt="Illustration"
                    className="illustration"
                />
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
