import {useState} from 'react';
import * as React from 'react'

interface FormData {
    name: string;
    consent: boolean;
}

const CustomForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        consent: false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                    setFormData({...formData, name: e.target.value})
                }
            />
            <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) =>
                    setFormData({...formData, consent: e.target.checked})
                }
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CustomForm;