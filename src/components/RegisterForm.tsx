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
                console.error('Registration failed');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("username")}
                placeholder="Email"
            />
            {errors.username && <span>{errors.username.message}</span>}

            <input
                {...register("firstName")}
                placeholder="First name"
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}

            <input
                {...register("lastName")}
                placeholder="Last name"
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}

            <input
                {...register("password")}
                type="password"
                placeholder="Password"
            />
            {errors.password && <span>{errors.password.message}</span>}

            <button type="submit">Register</button>
        </form>
    );
}
