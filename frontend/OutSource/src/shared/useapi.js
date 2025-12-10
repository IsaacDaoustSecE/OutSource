import { useState, useCallback, useEffect } from "react";

const useApi = (url, options = {}, config = { auto: true }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(config.auto);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null);

    const refetch = useCallback(
        async (body = null) => {
            setLoading(true);
            setError(null);
            setFormError(null);

            console.log("sending req");

            try {
                const res = await fetch(url, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        ...(options.headers || {}),
                    },
                    body: body ? JSON.stringify(body) : null,
                });

                const json = await res.json();

                if (!res.ok) {
                    if (json.errors) setFormError(json.errors);
                    setError(json.message || "Something went wrong");
                    setLoading(false);
                    return;
                }

                setData(json);
            } catch (err) {
                setError("Network error");
            } finally {
                setLoading(false);
            }
        },
        [url, options]
    );

    useEffect(() => {
        if (config.auto && loading && data === null && error === null) {
            refetch();
        }
    });

    return { loading, data, error, formError, refetch };
};

export default useApi;
