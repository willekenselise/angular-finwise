import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate  {
  constructor(private authService: AuthService, private router: Router) {}

  isConnected = false;
  canActivate(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {
    this.authService.getUserState.subscribe((user) => {
        if(user){
            console.log('authGuard: User is authenticated');
            return this.isConnected = true;
        }
        else{
            console.log('authGuard: User is not authenticated');
            return this.isConnected = false;
        }
    });
    if(!this.isConnected){
        this.router.navigate(['/login']);
        return false;
    }
    return true;
  }

}