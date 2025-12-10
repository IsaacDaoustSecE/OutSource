import styles from "./Message.module.css";
import Card from "../Card/Card";
import { useState } from "react";

function Reply({ userName, onCancel, onSend }) {
    return (
        <form>
            <Card
                headerLeft={"Reply to " + userName}
                textContent={
                    <textarea
                        className={styles.textarea}
                        placeholder="Write your message..."
                        rows={6}
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
                        <button onClick={onCancel}>cancel</button>
                        <button onClick={onSend}>send</button>
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
                        userName={fromUser.name}
                        onCancel={() => {
                            setShowReply(false);
                        }}
                    />
                )}
            </div>
        </>
    );
}
