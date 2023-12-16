import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserState.pipe(
      map(user => {
        const isConnected = !!user;
        if (isConnected) {
          console.log('AuthGuard: User is authenticated');
          return true;
        } else {
          console.log('AuthGuard: User is not authenticated');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
