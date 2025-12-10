import styles from "./Card.module.css";

export default function Card({
    headerLeft,
    headerRight,
    underHeader,
    text,
    textContent,
    footerLeft,
    footerRight,
}) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.headerLeft}>{headerLeft}</span>
                <span className={styles.headerRight}>{headerRight}</span>
            </div>
            <div className={styles.underHeader}>
                <span style={{ opacity: 0.7 }}>
                    {underHeader ? underHeader : null}
                </span>
            </div>
            {textContent ? (
                textContent
            ) : (
                <span className={styles.text}>{text}</span>
            )}
            <div className={styles.footer}>
                <div>{footerLeft ? footerLeft : null}</div>
                <div>{footerRight ? footerRight : null}</div>
            </div>
        </div>
    );
}
