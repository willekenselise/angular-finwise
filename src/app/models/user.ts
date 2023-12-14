export interface User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    photoURL?: string;
    displayName?: string;
    emailVerified? : boolean;
}