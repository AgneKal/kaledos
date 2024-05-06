import { Component } from '@angular/core';
import { GoodsService } from '../../services/goods.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public count:number = 0;
  public isError = false;
  public isLoggedIn = false;

  constructor (private goodsService: GoodsService, private authService: AuthService){
    if (this.authService.isLoggedIn) {
      this.loadCount();
    }
    this.goodsService.onGoodsCountChange.subscribe(() => this.loadCount());
    this.goodsService.onStatusChange.subscribe((status) => {
      if (status === 0) {
        this.isError = false;
      } else {
        this.isError = true;
      }
    });
    this.authService.onUserStatusChange.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn === true) {
        this.loadCount();
      }
    });
  }

  private loadCount(){
    this.goodsService.loadData()
    .subscribe((data) => {
      this.count = data.length;
      this.isError = false;
    });
  }
}
