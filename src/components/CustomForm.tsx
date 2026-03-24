import * as React from 'react';
import {useEffect, useState} from 'react';
import {apiFetch} from '../services/api.ts'
import type {UserSettings} from '../types/types.ts'

const CustomForm: React.FC = () => {

    const [userSettings, setUserSettings] = useState<UserSettings>({
        name: '',
        selectedSectors: [],
        acceptTerms: false,
    });

    useEffect(() => {
        const fetchUserSettings = async (): Promise<void> => {
            try {
                const response = await apiFetch('/user/settings');
                if (!response.ok) {
                    console.error('Network error');
                    return;
                }

                const data: UserSettings = await response.json();
                setUserSettings(data);
            } catch (err) {
                console.error(err);
            }
        };

        void fetchUserSettings();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', userSettings);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={userSettings.name}
                onChange={(e) =>
                    setUserSettings({...userSettings, name: e.target.value})
                }
            />

            <input
                type="checkbox"
                checked={userSettings.acceptTerms}
                onChange={(e) =>
                    setUserSettings({...userSettings, acceptTerms: e.target.checked})
                }
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CustomForm;