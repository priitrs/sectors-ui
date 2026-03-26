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
                if (response.ok) {
                    const data: TreeNode[] = await response.json();
                    setSectors(data);
                } else {
                    const errorData = await response.json().catch(() => null);
                    const message = errorData ? Object.values(errorData).join(', ') : 'Loading sectors failed';
                    toast.error(message);
                }
            } catch (err) {
                console.error(err);
            }
        };

        const fetchUserSettings = async (): Promise<void> => {
            try {
                const response = await apiFetch('/user/settings');
                if (response.ok) {
                    const data: UserSettings = await response.json();
                    setUserSettings(data);
                } else {
                    const errorData = await response.json().catch(() => null);
                    const message = errorData ? Object.values(errorData).join(', ') : 'Loading user settings failed';
                    toast.error(message);
                }
            } catch (err) {
                console.error(err);
            }
        };

        void fetchSectors();
        void fetchUserSettings();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const postUserSettings = async (): Promise<void> => {
            try {
                const response = await apiFetch('/user/settings', {
                    method: 'POST',
                    body: JSON.stringify(userSettings),
                });
                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    const message = errorData ? Object.values(errorData).join(', ') : 'Saving user settings failed';
                    toast.error(message);
                    return;
                } else {
                    const data: UserSettings = await response.json();
                    setUserSettings(data);
                    toast.success("Settings saved successfully");
                }
            } catch (err) {
                console.error(err);
            }
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
                <label style={{ paddingTop: '20px' }}>Please select the sectors you are currently involved in:</label>
                <TreeSelectComponent
                    allValues={sectors}
                    selectedValues={userSettings.selectedSectors}
                    onChange={(selectedSectors) =>
                        setUserSettings({ ...userSettings, selectedSectors })
                    }
                />
                <div className="form-row" style={{ paddingTop: '20px' }}>
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