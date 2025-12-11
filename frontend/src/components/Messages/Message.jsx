import styles from "./Message.module.css";
import Card from "../Card/Card";
import { useState } from "react";
import useApi from "../../shared/useapi";
import { useCallback } from "react";

function Reply({ me, toUser, onCancel, onSend }) {
    console.log(toUser, me);
    const { loading, data, error, formError, refetch } = useApi(
        "/messages",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        },
        { auto: false }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const [form, setForm] = useState({
        subject: "Reply from " + me.name,
        to_user: toUser._id,
        from_user: me.id,
        text: "",
    });

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            console.log(form);
            refetch(form);
        },
        [form, refetch]
    );

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={"Reply to " + toUser.name} disabled />

            <Card
                textContent={
                    <textarea
                        name="text"
                        className={styles.textarea}
                        placeholder="Write your message..."
                        rows={6}
                        value={form.text}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    ></textarea>
                }
                // headerRight={date.toLocaleDateString("en-US", {
                //     day: "numeric",
                //     month: "short",
                // })}
                // underHeader={fromUser.name}
                // text={text}
                footerRight={
                    <div className={styles.actions}>
                        <button type="button" onClick={onCancel}>
                            cancel
                        </button>
                        <button onClick={onSend} disabled={loading}>
                            {loading ? "sending..." : "send"}
                        </button>
                    </div>
                }
            />
        </form>
    );
}

export default function Message({ subject, text, fromUser, date }) {
    const [showReply, setShowReply] = useState(true);

    return (
        <>
            <Card
                headerLeft={subject}
                headerRight={date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                })}
                underHeader={fromUser.name}
                text={text}
                footerRight={
                    <div className={styles.actions}>
                        <button>delete</button>
                        <button onClick={() => setShowReply((prev) => !prev)}>
                            reply
                        </button>
                    </div>
                }
            />
            <div className={styles.replyRoot}>
                {showReply && (
                    <Reply
                        toUser={fromUser}
                        me={{
                            id: "6939c8271fbdcb039fcea1e4",
                            name: "Isaac TODO",
                        }}
                        onSend={() => {
                            console.log("sent!");
                        }}
                        onCancel={() => {
                            setShowReply(false);
                        }}
                    />
                )}
            </div>
        </>
    );
}
