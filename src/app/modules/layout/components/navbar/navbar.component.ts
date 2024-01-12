import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import { Colors, NAVBAR_BACKGROUNDS } from '@models/colors.model';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { BoardsService } from '@services/boards.service';
import { TokenService } from '@services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,
    private boardsService: BoardsService) {
  }

  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;

  user$ = this.authService.user$;
  navBarBackgroundColor: Colors = 'sky';
  navBarColors = NAVBAR_BACKGROUNDS;

  ngOnInit(): void {
    this.boardsService.backgroundColor$.subscribe(color => {
      this.navBarBackgroundColor = color;
    });
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  close(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }

  get colors() {
    const classes = this.navBarColors[this.navBarBackgroundColor];
    return classes ? classes : {};
  }
}