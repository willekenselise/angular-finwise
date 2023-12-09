import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, catchError, from, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth
  ) { 
    this.authStatusListener();
  }
  
  currentUser: any ;
  private authStatusSub = new BehaviorSubject(<any>null);
  currentAuthStatus = this.authStatusSub.asObservable();

  authStatusListener(){
    this.auth.onAuthStateChanged((credential)=>{
      if(credential){
        console.log(credential);
        this.authStatusSub.next(credential);
        console.log('User is logged in');
      }
      else{
        this.authStatusSub.next(null);
        console.log('User is logged out');
      }
    })
  }

  signIn(params: SignIn): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  SignUp(params: SignIn) : Observable<any>{
    return from(this.auth.createUserWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
    );
  }

  private translateFirebaseErrorMessage({code, message}: FirebaseError) {
    if (code === "auth/user-not-found") {
      return "User not found.";
    }
    if (code === "auth/wrong-password") {
      return "User not found.";
    }
    return message;
  }

  signOut(): Observable<any> {
    return from(this.auth.signOut());
  }

  register(params: Register): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(
      params.email, params.password
    )).pipe(
      catchError((error: FirebaseError) => 
        throwError(() => new Error(this.translateFirebaseErrorMessage(error)))
      )
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
  message: string
};

