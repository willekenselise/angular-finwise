import { Injectable } from '@angular/core';
import { ProfileUser } from '../models/user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: AngularFirestore) {}
  
  addUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );

    const userData: ProfileUser = {
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  updateUser(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );

    const userData: ProfileUser = {
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

  updateUserPhoto(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );

    const userData = {
      photoURL: user.photoURL,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  getUser(uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${uid}`
    );

    return userRef.valueChanges();
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