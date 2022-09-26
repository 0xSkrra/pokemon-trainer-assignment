import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon/pokemon.model';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css']
})
export class TrainerPage implements OnInit {

  get user(): User | undefined {
    return this.userService.user;
  }

  get collection(): Pokemon[] {
    if(this.userService.user) {
      return this.userService.user.Pokemon;
    }
    
    return [];
  }

  get collectionSize(): number | undefined {
    return this.user?.Pokemon.length;
  }

  get username(): string | undefined {
    return this.user?.username;
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
