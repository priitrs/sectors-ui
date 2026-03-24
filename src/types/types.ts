export interface AuthFormData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserSettings {
    name: string;
    selectedSectors: string[];
    acceptTerms: boolean;
}