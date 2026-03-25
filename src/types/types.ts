export interface AuthFormData {
    username: string;
    password: string;
}

export interface RegisterFormData {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface UserSettings {
    firstName: string;
    lastName: string;
    selectedSectors: number[];
    acceptTerms: boolean;
}

export interface TreeNode {
    value: number;
    title: string;
    children?: TreeNode[];
}