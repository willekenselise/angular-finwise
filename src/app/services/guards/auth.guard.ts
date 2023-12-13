import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

export const authGuard = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if(!auth.isLoggedIn()) {
        console.log('Not logged in')
        router.navigateByUrl('/login')
        return false
    }
    console.log('Logged in')
    return true
}