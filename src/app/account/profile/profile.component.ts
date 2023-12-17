import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadImageService } from '../../services/upload-image.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  
  frmPasswordReset = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService ,
    private userService: UsersService,
    private imageUploadService: UploadImageService,
    private snackBar: MatSnackBar
  ) { }

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
      displayName: this.displayNameFormm.value.pseudo ? this.displayNameFormm.value.pseudo : this.userInformation?.displayName,
      uid : uid
    }
    this.userService.updadteUserDisplayName(userData);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.imageUploadService.uploadImage(file).then((downloadURL) => {
      console.log('Image uploaded successfully. URL:', downloadURL);
      this.userService.updateUserPhoto(this.userInformation, downloadURL)
    });
  }

  sendPasswordResetRequest() {
    const email = this.frmPasswordReset.controls['email'].value;
    this.authService.sendPasswordResetEmail(email).subscribe({
      next: () => this.snackBar.open('Password reset email sent', 'OK', { duration: 5000 }),
      error: error => {
        this.snackBar.open(error.message, 'OK', { duration: 5000 });
      }
    });

  }
}
