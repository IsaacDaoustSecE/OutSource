import styles from "./Messages.module.css";
import Message from "./Message";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import drawing from "../../assets/drawing.png";
import useApi from "../../shared/useapi.js";
import Header from "../Header/Header.jsx";
import { Warren } from "../Warren.jsx";
import { AuthContext } from "../../AuthContext.js";
import { useContext } from "react";

export default function Messages() {
    // const navigate = useNavigate();

    // const user = useContext(AuthContext);

    // const [form, setForm] = useState({
    //     fullName: "",
    //     email: "",
    //     password: "",
    // });

    useEffect(() => {
        document.title = "Your Messages";
    }, []);

    // TODO: Replace with user's id from JWT
    const id = "693628716344bde4f9920cca";

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
                {data &&
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
