import styles from "./Freelancer.module.css";
import Card from "../Card/Card.jsx";
import { Warren } from "../Warren.jsx";

// useEffect(() => {
//     fetch("http://localhost:3000/messages")
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         })
//         .then((data) => {
//             setFetchedProducts(data);
//         })
//         .catch((error) => {
//             console.error("Error fetching messages:", error);
//         })
//         .finally(() => {});
// }, []);

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import drawing from "../../assets/drawing.png";
import useApi from "../../shared/useapi.js";
import Header from "../Header/Header.jsx";
import { Job } from "../Jobs/Jobs.jsx";

export default function Freelancer() {
    // const navigate = useNavigate();

    // const [form, setForm] = useState({
    //     fullName: "",
    //     email: "",
    //     password: "",
    // });

    // TODO: Change this to the url param id
    const id = "692d08cf3707ae2c5bf25366";

    const { data, loading, refetch } = useApi("/freelancers/" + id, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    // useEffect(() => {
    //     // refetch();
    // }, [refetch]);

    // Redirect to OTP page
    // useEffect(() => {
    //     if (!data) return;

    //     console.log("data is:", data);

    //     // navigate to /otp
    //     navigate("/otp", {
    //         state: { email: form.email },
    //     });
    // }, [data, form.email, navigate]);

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setForm({ ...form, [name]: value });
    // };

    // const handleSubmit = useCallback(
    //     (e) => {
    //         e.preventDefault();
    //         refetch(form); // submit to backend
    //     },
    //     [form]
    // );

    return (
        <div className="content-container">
            <div className="left-section">
                <Header />

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

// export default function Messages() {
//     return (
//         <div id="message-page">
//             <h1>Messages</h1>
//             <Message
//                 subject="Question about revisions"
//                 fromUser={{ name: "Always confused" }}
//                 text="Hey, I seen your job posting for logo design and I was wondering how many revisions I get for your first tier?"
//                 date={new Date()}
//             />
//         </div>
//     );
// }
