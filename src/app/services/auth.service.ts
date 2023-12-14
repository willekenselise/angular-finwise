import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { fbUser } from '../models/fbUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Auth State to check if user is logged in or not
  private authStatusSub = new BehaviorSubject<fbUser | null>(null);
  currentAuthStatus$ = this.authStatusSub.asObservable();

  constructor(private auth: AngularFireAuth) { 
    this.authStatusListener();
  }

  authStatusListener() {
    this.auth.authState.subscribe((credential) => {
      this.authStatusSub.next(credential);
    });
  }

  // ...

  get getUserState() : Observable<fbUser | null>{
    return this.auth.authState;
  }

  // ...

  get currentUser() : fbUser | null {
    let userCredential: fbUser | null = null; // Initialize with default value
    this.currentAuthStatus$.subscribe(
      (credential) => (userCredential = credential),
    );
    return userCredential;
  }
  
  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password)).pipe(
      catchError((error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))))
    );
  }

  signUp(params: SignUp): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(params.email, params.password)).pipe(
      catchError((error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))))
    );
  }

  signOut(): Observable<any> {
    return from(this.auth.signOut());
  }

  private translateFirebaseErrorMessage({ code, message }: FirebaseError) {
    if (code === "auth/invalid-credential") {
      return "User not found.";
    }
    return message;
  }
}

type SignIn = {
  email: string;
  password: string;
}

type SignUp = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string;
};
