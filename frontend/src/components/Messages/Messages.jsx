import styles from "./Messages.module.css";
import Message from "./Message";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../shared/useapi.js";
import Header from "../Header/Header.jsx";
import { Warren } from "../Warren.jsx";
import { AuthContext } from "../../AuthContext.js";
import { useContext } from "react";

export default function Messages() {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    // const [form, setForm] = useState({
    //     fullName: "",
    //     email: "",
    //     password: "",
    // });

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        document.title = "Your Messages";
    }, [user, navigate]);

    // TODO: Replace with user's id from JWT
    console.log("messages user:", user);
    const id = user?._id;

    const { loading, data, error, formError, refetch } = useApi(
        "/messages/user/" + id,
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

                <h2>Messages</h2>
                {data && data.length ? (
                    data.map((message) => {
                        return (
                            <Message
                                key={message._id}
                                subject={message.subject}
                                fromUser={message.fromUser}
                                text={message.text}
                                date={new Date(message.createdAt)}
                            />
                        );
                    })
                ) : (
                    <span>You don't have any messages...</span>
                )}
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
