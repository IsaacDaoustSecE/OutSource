import styles from "./Message.module.css";
import Card from "../Card/Card";

function Actions() {
    return (
        <div className={styles.actions}>
            <button>mark unread</button>
            <button>delete</button>
            <button>reply</button>
        </div>
    );
}

export default function Message({ subject, text, fromUser, date }) {
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
                footerRight={<Actions />}
            />
        </>
    );
}
