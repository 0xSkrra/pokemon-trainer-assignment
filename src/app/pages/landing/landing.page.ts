import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.css']
})
export class LandingPage {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
    
    ) {
      // make sure landing page can not be loaded if user is logged in
      if(typeof userService.user !== 'undefined'){
        router.navigateByUrl("/trainer")
      }
     }

  handleLogin(): void {
    this.router.navigateByUrl("/trainer")
  }

}
