import {useEffect, useState} from 'react';
import * as React from 'react'
import {apiFetch} from '../services/api.ts'

interface FormData {
    name: string;
    consent: boolean;
}

interface SectorNode {
    id: number;
    name: string;
    children: SectorNode[];
}

const CustomForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        consent: false,
    });

    useEffect(() => {
        const fetchSectors = async () => {
            try {
                const response = await apiFetch("/sectors");
                if (!response.ok) throw new Error("Network error");
                const data: SectorNode[] = await response.json();
                console.log("Sectors:", data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSectors().catch(err => console.error(err));
    }, []);

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