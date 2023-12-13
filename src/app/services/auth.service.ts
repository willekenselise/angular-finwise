import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, throwError, from } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
   private authStatusSub = new BehaviorSubject<any>(null);
   currentAuthStatus = this.authStatusSub.asObservable();

  constructor(private auth: AngularFireAuth) { 
    this.authStatusListener();
  }

  authStatusListener() {
    this.auth.authState.subscribe((credential) => {
      this.currentUser = credential || null;
      this.authStatusSub.next(this.currentUser);
    });
  }

  ggi() {
    return this.auth.authState;
  }
  
  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password)).pipe(
      catchError((error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))))
    );
  }

  SignUp(params: SignIn): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(params.email, params.password)).pipe(
      catchError((error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))))
    );
  }

  getUserUid(): string {
    return this.currentUser.uid;
  }

  private translateFirebaseErrorMessage({ code, message }: FirebaseError) {
    if (code === "auth/invalid-credential") {
      return "User not found.";
    }
    return message;
  }

  getCurrentAuthStatus(): Observable<any> {
    return this.currentAuthStatus;
  }

  isLoggedIn(): boolean {
    let authState = false;
    this.currentAuthStatus.subscribe(authStatus => authState = authStatus);
    console.log(authState);
    console.log(this.currentUser);
    return !!this.currentUser;
  }

  signOut(): Observable<any> {
    this.currentUser = null;
    return from(this.auth.signOut());
  }

  register(params: Register): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(params.email, params.password)).pipe(
      catchError((error: FirebaseError) => throwError(() => new Error(this.translateFirebaseErrorMessage(error))))
    );
  }
}

type SignIn = {
  email: string;
  password: string;
}

type Register = {
  email: string;
  password: string;
}

type FirebaseError = {
  code: string;
  message: string;
};
