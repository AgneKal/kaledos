import { Component } from '@angular/core';
import { GoodsService } from '../../services/goods.service';
import { Good } from '../../models/good';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-list-of-goods',
  standalone: true,
  imports: [CommonModule, RouterLink, LoadingComponent, ErrorComponent],
  templateUrl: './list-of-goods.component.html',
  styleUrl: './list-of-goods.component.css'
})
export class ListOfGoodsComponent {

  public goods: Good[] = [];

  public isLoading = false;
  public isError = false;

  public constructor(private goodService:GoodsService) {
    this.loadData();
  }

  private loadData() {
    const obs = this.goodService.loadData();

    this.isLoading = true;
    this.isError = false;

    obs.subscribe({
      next:(data) => {
        this.goods = data;
        this.isLoading = false;
        this.isError = false;
      },
      error:(error) => {
        this.isLoading = false;
        this.isError = true;
      }
    })
  }

  public deleteRecord(id:string|null) {
    if (id != null){
      this.isLoading = true;
      this.goodService.deleteRecord(id)
      .subscribe({
        next:()=>{
        this.loadData();
      },
      error: ()=> {
        this.isLoading = false;
        this.isError = true;
      }})
    }
  }

  public closeError() {
    this.loadData();
  }
}
