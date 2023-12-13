import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProfileUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class NotifService {

  private authStatusSub = new BehaviorSubject<ProfileUser | null>(null);
  currentAuthStatus$ = this.authStatusSub.asObservable();

  constructor() { }

  notifyConnection(user: ProfileUser): void {
    this.authStatusSub.next(user);
  }
}
