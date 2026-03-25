import * as React from 'react';
import {useEffect, useState} from 'react';
import {apiFetch} from '../services/api.ts'
import type {TreeNode, UserSettings} from '../types/types.ts'
import TreeSelectComponent from './TreeSelectComponent.tsx'
import { toast } from "react-hot-toast";


const CustomForm: React.FC = () => {

    const [userSettings, setUserSettings] = useState<UserSettings>({
        firstName: '',
        lastName: '',
        selectedSectors: [],
        acceptTerms: false,
    });

    const [sectors, setSectors] = useState<TreeNode[]>([]);

    useEffect(() => {
        const fetchSectors = async (): Promise<void> => {
            try {
                const response = await apiFetch('/sectors');
                if (!response.ok) {
                    console.error('Network error');
                    return;
                }

                const data: TreeNode[] = await response.json();
                setSectors(data);
            } catch (err) {
                console.error(err);
            }
        };

        void fetchSectors();

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
        const postUserSettings = async (): Promise<void> => {
            try {
                const response = await apiFetch('/user/settings', {
                    method: 'POST',
                    body: JSON.stringify(userSettings),
                });
                if (!response.ok) {
                    console.error('Setting saving error');
                    return;
                }
            } catch (err) {
                console.error(err);
            }
            toast.success("Settings saved successfully");
        };
        void postUserSettings();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="First name"
                    required
                    value={userSettings.firstName}
                    onChange={(e) =>
                        setUserSettings({...userSettings, firstName: e.target.value})
                    }
                />
                <input
                    type="text"
                    placeholder="Last name"
                    required
                    value={userSettings.lastName}
                    onChange={(e) =>
                        setUserSettings({...userSettings, lastName: e.target.value})
                    }
                />
                <TreeSelectComponent
                    allValues={sectors}
                    selectedValues={userSettings.selectedSectors}
                    onChange={(selectedSectors) =>
                        setUserSettings({ ...userSettings, selectedSectors })
                    }
                />
                <div className="form-row">
                    <input
                        type="checkbox"
                        id="acceptTerms"
                        checked={userSettings.acceptTerms}
                        onChange={(e) =>
                            setUserSettings({...userSettings, acceptTerms: e.target.checked})
                        }
                    />
                    <label htmlFor="acceptTerms">I agree to the terms</label>
                </div>
            </div>
            <div className="form-actions">
                <button type="submit">Save</button>
            </div>
        </form>
    );
};

export default CustomForm;