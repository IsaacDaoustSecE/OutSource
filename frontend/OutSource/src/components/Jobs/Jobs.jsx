import styles from "./Jobs.module.css";
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

export function Job({ job }) {
    console.log(job);
    return (
        <Card
            headerLeft={job.title}
            headerRight={"$" + job.price}
            underHeader={job?.freelancer?.user?.name}
            text={job.description}
            footerLeft={
                <span>
                    Estimated duration: {job.expected_duration_days} day(s)
                </span>
            }
            footerRight={<span>Order</span>}
        />
    );
}

export default function Jobs() {
    // const navigate = useNavigate();

    // const [form, setForm] = useState({
    //     fullName: "",
    //     email: "",
    //     password: "",
    // });

    const { loading, data, error, formError, refetch } = useApi("/jobs", {
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

                <h2>Jobs</h2>
                {data &&
                    data.map((job) => {
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
