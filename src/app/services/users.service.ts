import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { getAuth, updateProfile } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore, private authService: AuthService) {}
  
  getUser() {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${this.authService.currentUser?.uid}`
    );

    return userRef.valueChanges();
  }

  addUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  updateUser(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  updateUserPhoto(user: any, photoURL: string) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );

    const userData = {
      photoURL: photoURL,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  deleteUser(uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${uid}`
    );

    return userRef.delete();
  }

  updadteUserDisplayName(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );

    const userData = {
      displayName: user.displayName,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }
}