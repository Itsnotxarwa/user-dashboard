let isRefreshing = false;

const apiFetch = async (url, options = {}) => {
    const buildOptions = (opts) => ({
        ...opts,
        credentials: "include",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            ...opts.headers,
        },
    });

    const response = await fetch(url, buildOptions(options));

    if (response.status === 401 && !isRefreshing) {
        isRefreshing = true;
        try{
        const refreshResponse = await fetch("https://api.mazia.ai/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (refreshResponse.status === 401) {
            window.location.href = "/session-expired";
            return;
        }

        if (!refreshResponse.ok) {
            throw new Error(`Token refresh failed: ${refreshResponse.status}`);
        }

        const retryResponse = await fetch(url, buildOptions(options));

        if (retryResponse.status === 401) {
            window.location.href = "/session-expired";
            return;
        }

        return retryResponse;
    } finally {
        isRefreshing = false;
    }
    }

    return response;
};

export default apiFetch;