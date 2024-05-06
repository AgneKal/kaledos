import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  public isLoggedIn = false;

  public constructor(private authService:AuthService) {
    this.authService.onUserStatusChange.subscribe((isLoggedIn)=>{
      this.isLoggedIn = isLoggedIn;
    })
  }

  public onClickLogout(){
    this.authService.logout();
  }
}
