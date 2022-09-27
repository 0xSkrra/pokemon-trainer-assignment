import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public onLogout(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
  
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
