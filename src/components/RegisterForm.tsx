import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from 'react-hot-toast'
import {apiFetch} from '../services/api.ts'
import {useNavigate} from 'react-router-dom'

const NAME_PATTERN = /^[\p{L}\s'-]+$/u;
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

const schema = z.object({
    username: z
        .string()
        .nonempty("Email is required")
        .max(100, "Email too long")
        .email("Invalid email"),
    firstName: z
        .string()
        .nonempty("First name required")
        .max(50, "Too long")
        .regex(NAME_PATTERN, "Invalid first name"),
    lastName: z
        .string()
        .nonempty("Last name required")
        .max(50, "Too long")
        .regex(NAME_PATTERN, "Invalid last name"),
    password: z
        .string()
        .nonempty("Password required")
        .min(8, "Min 8 characters")
        .max(100, "Max 100 characters")
        .regex(PASSWORD_PATTERN, "Must include upper, lower, number & special char"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors},} = useForm<FormData>({resolver: zodResolver(schema),});

    const onSubmit = async (data: FormData) => {
        try {
            const res = await apiFetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (res.ok) {
                navigate('/');
                toast.success("Registration successful, log in to continue");
            } else {
                const errorData = await res.json().catch(() => null);
                const message = errorData ? Object.values(errorData).join(', ') : 'Registration failed';
                toast.error(message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <input
                    {...register("username")}
                    type={"email"}
                    placeholder="Email"
                />
                <span className="error-text">{errors.username?.message ?? ''}</span>

                <input
                    {...register("firstName")}
                    type={"text"}
                    placeholder="First name"
                />
                <span className="error-text">{errors.firstName?.message ?? ''}</span>

                <input
                    {...register("lastName")}
                    type={"text"}
                    placeholder="Last name"
                />
                <span className="error-text">{errors.lastName?.message ?? ''}</span>

                <input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                />
                <span className="error-text">{errors.password?.message ?? ''}</span>
            </div>
            <div className="form-actions">
                <button type="submit">Register</button>
            </div>
        </form>
    );
}
