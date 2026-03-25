import {Link} from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import * as React from 'react'

const LoginPage: React.FC = () => {
    return (
        <div className="card">
            <h2>Login</h2>
            <LoginForm/>

            <p className="link-text">
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};

export default LoginPage;