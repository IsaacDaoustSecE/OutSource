import styles from "./Freelancer.module.css";
import Card from "../Card/Card.jsx";
import { Warren } from "../Warren.jsx";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import drawing from "../../assets/drawing.png";
import useApi from "../../shared/useapi.js";
import Header from "../Header/Header.jsx";
import { Job } from "../Jobs/Jobs.jsx";

export default function Freelancer() {

    const id = "692d08cf3707ae2c5bf25366";

    const { data, loading, } = useApi("/freelancers/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    const navigate = useNavigate();


    return (
        <div className="content-container">
            <div className="left-section">
                <Header />
                <div className="JobPost-container">
                        <button
                            type="submit"
                            className="JobPost-btn"
                            disabled={loading}
                            onClick={() => navigate("/JobPosting")}
                            >
                           {loading ? "Sending Form": "Create a Job!"} 
                        </button>
                        </div>

                {data && (
                    <>
                        <h2>{data.user.name}</h2>
                        <p>{data.field}</p>
                        <hr></hr>
                        <p>{data.bio}</p>
                    </>
                )}

                <h3>Jobs</h3>
                {data &&
                    data.jobs.map((job) => {
                        job.freelancer = data;
                        return <Job key={job._id} job={job} />;
                    })}
            </div>

            <Warren />
        </div>
    );
}
;
