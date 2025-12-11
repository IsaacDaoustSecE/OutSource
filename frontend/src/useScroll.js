import { useEffect, useRef, useState } from "react";

const useScroll = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const debounceTimer = useRef(null);

    useEffect(() => {
        const updatePosition = () => {
            if (debounceTimer.current) {
                clearInterval(debounceTimer.current);
            }
            debounceTimer.current = setTimeout(() => {
                setScrollPosition(window.pageYOffset);
                debounceTimer.current = null;
            }, 500);
        };

        window.addEventListener("scroll", updatePosition);
        updatePosition();

        return () => window.removeEventListener("scroll", updatePosition);
    }, []);

    return scrollPosition;
};

export default useScroll;
