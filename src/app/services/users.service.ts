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

  // updateUser(user: ProfileUser): Observable<void> {
  //   const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
  //     `users/${user.uid}`
  //   );    
  //   return from(updateDoc( userRef, { ...user }));
  // }
}