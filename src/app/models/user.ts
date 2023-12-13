export interface ProfileUser {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    photoURL?: string;
    displayName?: string;
    isEmailVerified? : boolean;
}