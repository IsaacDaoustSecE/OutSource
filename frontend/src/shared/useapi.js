import { useState, useCallback, useEffect } from "react";

const DEFAULT_CONFIG = {
    auto: true,
    baseurl: import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3000",
};

const useApi = (route, options = {}, userConfig = {}) => {
    const config = { ...DEFAULT_CONFIG, ...userConfig };

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState(null);

    const refetch = useCallback(
        async (body = null) => {
            console.log("BaseURL:", config.baseurl); // debugging
            console.log("Final URL:", config.baseurl + route);

            try {
                setLoading(true);
                setError(null);
                setFormError(null);

                const res = await fetch(config.baseurl + route, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        ...(options.headers || {}),
                    },
                    body: body
                        ? JSON.stringify(body)
                        : options.body
                          ? JSON.stringify(options.body)
                          : null,
                    credentials: "include",
                });

                const json = await res.json();

                if (!res.ok) {
                    if (json.errors) setFormError(json.errors);
                    setError(
                        json.message ||
                            json.errorMessage ||
                            "Something went wrong"
                    );
                    return;
                }
                setData(json);
            } catch (e) {
                console.log(e);
                setError("Network error");
            } finally {
                setLoading(false);
            }
        },
        [route, options, config.baseurl]
    );

    useEffect(() => {
        if (config.auto) refetch();
    }, []);

    return { loading, data, error, formError, refetch };
};

export default useApi;
