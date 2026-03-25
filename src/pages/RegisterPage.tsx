import {Link} from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';
import * as React from 'react'

const RegisterPage: React.FC = () => {
    return (
        <div className="card">
            <h2>Register</h2>
            <RegisterForm/>

            <p className="link-text">
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
};

export default RegisterPage;