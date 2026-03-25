import { useNavigate } from 'react-router-dom';
import CustomForm from '../components/CustomForm';
import {useAuth} from '../context/useAuth.ts'

const FormPage: React.FC = () => {
    const {logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <h2>My Profile</h2>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="card card-wide">
                <CustomForm />
            </div>
        </div>
    );
};

export default FormPage;