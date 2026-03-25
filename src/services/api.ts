export const apiFetch = (url: string, options: RequestInit = {}) => {
    return fetch('/api' + url, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });
};