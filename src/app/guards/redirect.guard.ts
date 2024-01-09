import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from "@services/token.service";

export const redirectGuard: CanActivateFn = () => {
  const isValidToken = inject(TokenService).isValidToken();
  const router = inject(Router);

  if (isValidToken) {
    router.navigate(['/app']);
  }
  return true;
};

// sin validar la expiracion del token
export const redirectGuardWithoutExpiration: CanActivateFn = () => {
  const token = inject(TokenService).getToken();
  const router = inject(Router);

  if (token) {
    router.navigate(['/app']);
  }
  return true;
};

// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { CanActivate } from '@angular/router';

// import { TokenService } from '@services/token.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class RedirectGuard implements CanActivate {

//   constructor(private tokenService: TokenService, private router: Router) {}

//   canActivate(): boolean {
//     const token = this.tokenService.getToken();
//     if(token) {
//       this.router.navigate(['/app']);
//     }
//     return true;
//   }
// }