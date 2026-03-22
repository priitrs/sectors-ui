import {Navigate} from 'react-router-dom';
import * as React from 'react'
import type {JSX} from 'react';
import {useAuth} from '../context/useAuth.ts'

interface Props {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({children}) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) return <p>Loading...</p>;

    if (!isAuthenticated) {
        return <Navigate to="/" replace/>;
    }

    return children;
};

export default ProtectedRoute;