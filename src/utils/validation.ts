export interface ValidationResult {
    isValid: boolean;
    message: string;
}

interface FormState {
    [key: string]: string | boolean;
}

export const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return { isValid: emailRegex.test(email), message: 'Email is not valid.' };
};

export const validatePassword = (password: string): ValidationResult => {
    const minLength = 6;
    // const hasUpperCase = /[A-Z]/.test(password);
    // const hasNumber = /[0-9]/.test(password);
    // const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < minLength) {
        return { isValid: false, message: 'Password must be at least 6 characters long.' };
    }
    // if (!hasUpperCase) {
    //     return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
    // }
    // if (!hasNumber) {
    //     return { isValid: false, message: 'Password must contain at least one number.' };
    // }
    // if (!hasSpecialChar) {
    //     return { isValid: false, message: 'Password must contain at least one special character (!@#$%^&*).' };
    // }
    return { isValid: true, message: '' };
};

export const createFormState = (fields: string[]): FormState => {
    const state: FormState = {};
    fields.forEach((field: string) => {
        state[field] = '';
        state[`${field}Error`] = false;
        state[`${field}ErrorMessage`] = '';
    });
    return state;
}; 