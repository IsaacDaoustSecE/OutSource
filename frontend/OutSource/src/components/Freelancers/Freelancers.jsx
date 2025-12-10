import styles from "./Freelancers.module.css";
import Card from "../Card/Card.jsx";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import drawing from "../../assets/drawing.png";
import useApi from "../../shared/useapi.js";
import Header from "../Header/Header.jsx";

export function Freelancer({ freelancer }) {
    console.log(freelancer);
    return (
        <Card
            headerLeft={freelancer.user.name}
            headerRight={freelancer.field}
            text={freelancer.bio}
            footerLeft={
                <span>
                    Estimated duration: {freelancer.expected_duration_days}{" "}
                    day(s)
                </span>
            }
            footerRight={<span>Order</span>}
        />
    );
}

export default function Freelancers() {
    // const navigate = useNavigate();

    // const [form, setForm] = useState({
    //     fullName: "",
    //     email: "",
    //     password: "",
    // });

    const { loading, data, error, formError, refetch } = useApi(
        "/freelancers",
        {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }
    );

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

                <h2>Freelancers</h2>
                {data &&
                    data.map((freelancer) => {
                        return (
                            <Freelancer
                                key={freelancer._id}
                                freelancer={freelancer}
                            />
                        );
                    })}
            </div>

            <div className="right-section">
                <img src={drawing} alt="drawing" />
            </div>
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
