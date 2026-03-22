export const apiFetch = (url: string, options: RequestInit = {}) => {
    return fetch('http://localhost:8000/api' + url, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });
};