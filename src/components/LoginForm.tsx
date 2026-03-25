import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as React from 'react';
import {useAuth} from '../context/useAuth.ts'
import type {AuthFormData} from '../types/types.ts'
import {toast} from 'react-hot-toast'
import {apiFetch} from '../services/api.ts'

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState<AuthFormData>({
        username: '',
        password: '',
    });
    const navigate = useNavigate();
    const {checkAuth} = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formBody = new URLSearchParams();
        formBody.append('username', formData.username);
        formBody.append('password', formData.password);

        try {
            const res = await apiFetch('/auth/login', {
                method: 'POST',
                body: formBody,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (res.ok) {
                await checkAuth();
                navigate('/form');
            } else {
                const errorData = await res.json().catch(() => null);
                const message = errorData ? Object.values(errorData).join(', ') : 'Login failed';
                toast.error(message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    name="username"
                    type="email"
                    placeholder="Email"
                    required
                    value={formData.username}
                    onChange={(e) =>
                        setFormData({...formData, username: e.target.value})
                    }
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({...formData, password: e.target.value})
                    }
                />
            </div>
            <div className="form-actions">
                <button type="submit">Login</button>
            </div>
        </form>
    );
};

export default LoginForm;