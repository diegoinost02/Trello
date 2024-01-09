import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from "@services/token.service";

export const authGuard: CanActivateFn = () => {
  // const isValidToken = inject(TokenService).isValidToken();
  const isValidToken = inject(TokenService).isValidRefreshToken();
  const router = inject(Router);

  if (!isValidToken) {
    router.navigate(['/login']);
  }
  return true;
};

// sin validar la expiracion del token
// export const authGuardWithoutExpiration: CanActivateFn = () => {
//   const token = inject(TokenService).getToken();
//   const router = inject(Router);

//   if (!token) {
//     router.navigate(['/login']);
//   }
//   return true;
// };



// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { CanActivate } from '@angular/router';

// import { TokenService } from '@services/token.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   constructor(private tokenService: TokenService, private router: Router) {}

//   canActivate(): boolean {
//     const token = this.tokenService.getToken();
//     if(!token) {
//       this.router.navigate(['/login']);
//       return false;
//     }
//     return true;
//   }
// }