import {useState} from 'react';
import * as React from 'react'
import {apiFetch} from '../services/api.ts'
import {useNavigate} from 'react-router-dom'
import type {RegisterFormData} from '../types/types.ts'

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<RegisterFormData>({
        username: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const res = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                navigate('/');
            } else {
                const data = await res.json();
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                type="email"
                placeholder="Email"
                value={formData.username}
                onChange={(e) =>
                    setFormData({...formData, username: e.target.value})
                }
            />
            <input
                name="firstName"
                type="text"
                placeholder="First name"
                value={formData.firstName}
                onChange={(e) =>
                    setFormData({...formData, firstName: e.target.value})
                }
            />
            <input
                name="lastName"
                type="text"
                placeholder="Last name"
                value={formData.lastName}
                onChange={(e) =>
                    setFormData({...formData, lastName: e.target.value})
                }
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                    setFormData({...formData, password: e.target.value})
                }
            />
            <button type="submit">Register</button>

            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
    );
};

export default RegisterForm;