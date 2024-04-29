import { Component } from '@angular/core';
import { GoodsService } from '../../services/goods.service';
import { Good } from '../../models/good';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-of-goods',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-of-goods.component.html',
  styleUrl: './list-of-goods.component.css'
})
export class ListOfGoodsComponent {

  public goods: Good[] = [];

  public constructor(private goodService:GoodsService) {
    this.loadData();
  }

  private loadData() {
    this.goodService.loadData().subscribe((data)=>{
      this.goods = [];
      for (let x in data){
        this.goods.push({...data[x], id:x});
      }
    })
  }

  public deleteRecord(id:string|null) {
    if (id != null){
      this.goodService.deleteRecord(id).subscribe(()=>{
        this.loadData();
      })
    }
  }
}
