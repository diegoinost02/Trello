import { Component } from '@angular/core';
import { GenericDataSource } from './data-source';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent {

  dataSource = new GenericDataSource();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  constructor(private usersService: UsersService, private authService: AuthService) { }

  user: User | null = null;

  // user$ = this.authService.user$;

  ngOnInit(): void {
    this.getUsers();
    this.authService.getProfile().subscribe(user => {
      this.user = user;
    })
  }

  getUsers() {
    this.usersService.getUsers().subscribe(users => {
      this.dataSource.init(users);
    })
  }
}