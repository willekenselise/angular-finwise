import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { ProfileUser } from '../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  userInformation : ProfileUser | undefined;

  displayNameFormm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService ,private userService: UsersService) {
    this.userService.getUser(this.authService.getUserUid()).subscribe((data) => {
      this.userInformation = data;
    });
  }

  ngOnInit(): void {}

  logout() {
    this.authService.signOut();
  }

  upadateUserDisplayName() {
    const userData = {
      displayName: this.displayNameFormm.value.pseudo,
      uid : this.authService.getUserUid()
    }
    this.userService.updadteUserDisplayName(userData);
  }

}
