import { Component } from '@angular/core';
import { GoodsService } from '../../services/goods.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  public count:number = 0;

  constructor (private goodsService: GoodsService){
    this.loadCount();
    this.goodsService.onGoodsCountChange
    .subscribe(() => this.loadCount());
  }

  private loadCount(){
    this.goodsService.loadData()
    .subscribe((data) => {
      this.count = data.length;
    });
  }
}
