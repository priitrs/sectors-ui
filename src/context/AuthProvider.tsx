import {useState, useEffect} from 'react';
import {apiFetch} from '../services/api.ts'
import {AuthContext} from './AuthContext.ts';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const checkAuth = async () => {
        try {
            const res = await apiFetch('/auth/me', {method: 'GET',});
            setIsAuthenticated(res.ok);
        } catch {
            setIsAuthenticated(false);
        }
    };

    const logout = async () => {
        try {
            await apiFetch('/auth/logout', {method: 'POST'});
            await checkAuth();
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    useEffect(() => {
        const initAuth = async () => {
            await checkAuth();
        };
        initAuth().catch(err => console.error(err));
    }, []);

    return (
        <AuthContext.Provider
            value={{isAuthenticated, checkAuth, logout}}
        >
            {children}
        </AuthContext.Provider>
    );
};

