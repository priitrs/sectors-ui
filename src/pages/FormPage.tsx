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
        <div>
            <h2>Form Page</h2>
            <CustomForm />

            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default FormPage;