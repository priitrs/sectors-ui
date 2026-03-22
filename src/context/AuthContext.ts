import {createContext} from 'react';

export interface AuthContextType {
    isAuthenticated: boolean | null;
    checkAuth: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);