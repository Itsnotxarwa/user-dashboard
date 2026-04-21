export function handleUnauthorized(status) {
    if (status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/session-expired";
    }
}