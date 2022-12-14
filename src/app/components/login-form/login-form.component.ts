import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';
import { LoginService } from 'src/app/services/User/login.service';
import { UserService } from 'src/app/services/User/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor(
private readonly loginService: LoginService,
private readonly userService: UserService
) { }

  public loginSubmit(loginForm: NgForm): void {

    const { username } = loginForm.value;

    this.loginService.login(username)
      .subscribe({
        next: (user : User) => {
          this.userService.user = user;
          this.login.emit();
        },
        error: () => {

        }
      })
  }

}
