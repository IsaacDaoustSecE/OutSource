import React from "react";
import "./App.css";
import Drawing from "./assets/drawing.png";
import { useEffect, useState } from "react";
const BASE = "http://localhost:3000";

export default function App() {
    const [jobs, setJobs] = useState([]);
    const [freelancers, setFreelancers] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const initialJobs = await fetch(BASE + "/jobs").then((res) =>
                res.json()
            );

            const initialFreelancers = await fetch(BASE + "/freelancers").then(
                (res) => res.json()
            );

            console.log(initialJobs, initialFreelancers);

            setJobs(initialJobs);
            setFreelancers(initialFreelancers);
        }

        fetchData();
    }, []);

    return (
        <div className="page-container">
            <div className="left-column">
                <h1 className="title">OutSource</h1>

                <nav className="nav">
                    <a href="#">Home</a>
                    <a href="#">Messages</a>
                    <a href="#">Jobs</a>
                    <a href="#">Freelancers</a>
                </nav>

                <SectionTitle
                    title="Latest Jobs"
                    time="Updated 6 minutes ago"
                />

                {jobs.map((job) => {
                    return (
                        <Card
                            key={job.title}
                            title={job.title}
                            user={job.freelancer?.user?.name}
                            price={"$" + job.price}
                        />
                    );
                })}

                {/* <Card
                    title="Create a Business Logo"
                    user="artfan97"
                    price="$18"
                /> */}

                <div style={{ marginTop: "40px" }}>
                    <SectionTitle
                        title="Latest Freelancers"
                        time="Updated 12 minutes ago"
                    />
                </div>

                {freelancers.map((freelancer) => {
                    return (
                        <FreelancerCard
                            key={freelancer.skills}
                            user={freelancer.user.name}
                            skills={freelancer.skills}
                            jobs={freelancer.jobs.length + " jobs"}
                        />
                    );
                })}
                {/* 
                <FreelancerCard
                    user="artfan97"
                    jobs="2 jobs"
                    skills="Skills include graphics, animations, and logos"
                /> */}
            </div>

            <div className="image-container">
                <img
                    src={Drawing}
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
                <a href="#">View All</a>
            </div>
            <p className="updated-time">{time}</p>
        </div>
    );
}

function Card({ title, user, price }) {
    return (
        <div className="card">
            <div className="card-header">
                <strong>{title}</strong>
                <span>{price}</span>
            </div>
            <p className="card-user">{user}</p>
        </div>
    );
}

function FreelancerCard({ user, jobs, skills }) {
    return (
        <div className="card">
            <div className="card-header">
                <strong>{user}</strong>
                <span>{jobs}</span>
            </div>
            <p className="card-user">{skills}</p>
        </div>
    );
}
