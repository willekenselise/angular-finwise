import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userInformation : User | undefined;

  displayNameFormm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService ,private userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.userInformation = user;
    });
  }

  logout() {
    this.authService.signOut();
  }

  upadateUserDisplayName(uid: string) {
    const userData = {
      displayName: this.displayNameFormm.value.pseudo,
      uid : uid
    }
    this.userService.updadteUserDisplayName(userData);
  }

}
