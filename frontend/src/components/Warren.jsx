import drawing from "../assets/drawing.png";
import useScroll from "../useScroll";

export function Warren() {
    const scrollPosition = useScroll();

    return (
        <div className="right-section">
            <img
                src={drawing}
                alt="drawing"
                style={{
                    transform: `translateY(${scrollPosition}px)`,
                    transition: "1s transform",
                }}
            />
        </div>
    );
}
