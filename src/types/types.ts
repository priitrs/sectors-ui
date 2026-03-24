export interface AuthFormData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserSettings {
    firstName: string;
    lastName: string;
    selectedSectors: string[];
    acceptTerms: boolean;
}